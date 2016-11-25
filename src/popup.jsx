const Heroku = require('heroku-client')
const React = require('react')
const ReactDOM = require('react-dom')
const sortBy = require('lodash/sortBy')

function getHerokuClient() {
  return new Heroku({ token: localStorage.authToken })
}

async function getApps() {
  return getHerokuClient().get('/apps')
}

async function getAddons(appId) {
  return getHerokuClient().get(`/apps/${appId}/addons`)
}

function getAppListElement() {
  return document.querySelector('.app-list')
}

function getAddonListElement() {
  return document.querySelector('.addon-list')
}

async function showAddonsList(app) {
  const addons = await getAddons(app.id)
  addons.sort(function (a, b) {
    return a.plan.name.localeCompare(b.plan.name)
  })

  const appListElement = getAppListElement()
  appListElement.style.display = 'none'

  const listElement = getAddonListElement()
  listElement.innerHTML = ''
  listElement.style.display = 'block'

  for (let addon of addons) {
    const item = document.createElement('a')
    item.className = 'addon-list-item'
    item.target = '_blank'
    item.href = addon.web_url
    item.innerText = addon.plan.name
    listElement.appendChild(item)
  }
}

async function showAppList() {
  const apps = await getApps()
  apps.sort(function (a, b) {
    return a.name.localeCompare(b.name)
  })

  const listElement = document.querySelector('.app-list')
  listElement.innerHTML = ''

  for (let app of apps) {
    const item = document.createElement('a')
    item.className = 'app-list-item'
    item.innerText = app.name
    item.addEventListener('click', () => showAddonsList(app))
    listElement.appendChild(item)
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      pane: 'apps',
      // For the 'apps' pane
      apps: [],
      // For the 'addons' pane
      app: null,
      addons: [],
    }
  }

  componentWillMount() {
    this.showAppsList()
  }

  async showAppsList() {
    this.setState({ isLoading: true })
    const apps = await getApps()
    this.setState({ isLoading: false, pane: 'apps', apps: apps })
  }

  async showAddonsList(app) {
    this.setState({ isLoading: true })
    const addons = await getAddons(app.id)
    this.setState({ isLoading: false, pane: 'addons', addons: addons, app })
  }

  renderApp(app) {
    return (
      <a
        key={app.id}
        className='app-list-item'
        onClick={() => this.showAddonsList(app)}
      >
        {app.name}
      </a>
    )
  }

  renderAddon(addon) {
    return (
      <a
        key={addon.id}
        className='addon-list-item'
        target='_blank'
        href={addon.web_url}
      >
        {addon.plan.name}
      </a>
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <p className="loading">Loading...</p>
      )
    } else if (this.state.pane === 'apps') {
      const apps = sortBy(this.state.apps, app => app.name)
      return (
        <div className="app-list">
          {apps.map(app => this.renderApp(app))}
        </div>
      )
    } else if (this.state.pane === 'addons') {
      const addons = sortBy(this.state.addons, addon => addon.plan.name)
      return (
        <div className="addon-list">
          {addons.map(addon => this.renderAddon(addon))}
        </div>
      )
    }
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  const authToken = localStorage.authToken
  if (authToken === undefined || authToken === '') {
    getAppListElement().style.display = 'none'
    document.querySelector('.options-warning').style.display = 'block'
    return
  }

  // showAppList()
  const appNode = document.querySelector('.app')
  ReactDOM.render(<App />, appNode)
})

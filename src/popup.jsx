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

  componentDidMount() {
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

  renderHeader() {
    if (this.state.isLoading) {
      return null
    }

    let body
    if (this.state.pane === 'apps') {
      body = (
        <span>
          Apps
        </span>
      )
    } else if (this.state.pane === 'addons') {
      const goBackToApps = () => {
        this.setState({
          pane: 'apps',
          app: null,
          addons: [],
        })
      }

      body = (
        <a
          className="header-button"
          href="#"
          onClick={goBackToApps}
        >
          Back to apps
        </a>
      )
    }

    const optionsURL = chrome.extension.getURL('options.html')
    const optionsButton = (
      <a
        className="header-button header-button-options"
        href={optionsURL}
        target="_blank"
      >
        Settings
      </a>
    )

    return (
      <div className="header">
        {body}
        {optionsButton}
      </div>
    )
  }

  renderPane() {
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

  render() {
    const appClassName = `app app-${this.state.pane}`
    return (
      <div className={appClassName}>
        {this.renderHeader()}
        {this.renderPane()}
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  const appContainer = document.querySelector('.app-container')

  const authToken = localStorage.authToken
  if (authToken === undefined || authToken === '') {
    appContainer.style.display = 'none'
    document.querySelector('.options-warning').style.display = 'block'
    return
  }

  ReactDOM.render(<App />, appContainer)
})

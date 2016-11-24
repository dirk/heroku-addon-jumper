const Heroku = require('heroku-client')

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

document.addEventListener('DOMContentLoaded', async function() {
  const authToken = localStorage.authToken
  if (authToken === undefined || authToken === '') {
    getAppListElement().style.display = 'none'
    document.querySelector('.options-warning').style.display = 'block'
    return
  }

  showAppList()
});

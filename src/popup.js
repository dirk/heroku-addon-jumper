const Heroku = require('heroku-client')

function getHerokuClient() {
  return new Heroku({ token: localStorage.authToken })
}

async function getApps() {
  return heroku.get('/apps')
}

async function getAddons(appId) {
  return heroku.get(`/apps/${appId}/addons`)
}

function getAppListElement() {
  return document.querySelector('.app-list')
}

function getAddonListElement() {
  return document.querySelector('.addon-list')
}

async function showAddonsList(app) {
  const addons = await getAddons(app.id)

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

document.addEventListener('DOMContentLoaded', async function() {
  const apps = await getApps()

  const listElement = document.querySelector('.app-list')
  listElement.innerHTML = ''

  for (let app of apps) {
    const item = document.createElement('a')
    item.className = 'app-list-item'
    item.innerText = app.name
    item.addEventListener('click', () => showAddonsList(app))
    listElement.appendChild(item)
  }
});

// A mock function to mimic making an async request for data

const baseURL = `http://127.0.0.1:3500`
const headers = {
  'Accept': 'application/json', 'Content-Type': 'application/json'
}

export function callGetLeadsAPI() {
  return fetch(`${baseURL}/leadsList`).then(data => data.json())
}

export const callDeleteLeadAPI = (id) => {
  return fetch(`${baseURL}/leadsList/${id}`, {
    method: 'DELETE'
  })
}

export const callPostLeadAPI = (lead) => fetch(`${baseURL}/leadsList`, {
  method: "POST", headers, body: JSON.stringify(lead)
})

export const callPutLeadAPI = (lead) => fetch(`${baseURL}/leadsList/${lead.id}`, {
  method: "PUT", headers, body: JSON.stringify(lead)
})

export const callSearchLeadAPI = (searchValue) => {
  return fetch(`${baseURL}/leadsList/?q=${searchValue}`, {
    method: "GET"
  }).then(res => res.json())
}

export const callToggleLeadSelectionAPI = (lead) => fetch(`${baseURL}/leadsList/${lead.id}`, {
  method: "PATCH",
  headers,
  body: JSON.stringify({
    selected: !lead.selected
  })
}).then(response => response.json())
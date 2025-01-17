const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		contacts: [],
	  },
	  actions: {
		userExists: async () => {
		  const resp = await fetch(
			"https://playground.4geeks.com/contact/agendas/vic2580",
			{
			  method: "GET",
			  headers: {
				"Content-type": "application/json",
			  },
			}
		  );
		  if (resp.status === 404) {
			return false;
		  }
		  return resp.ok;
		},
  
		createUser: async () => {
		  const resp = await fetch(
			"https://playground.4geeks.com/contact/agendas/vic2580",
			{
			  method: "POST",
			  headers: {
				"Content-type": "application/json",
			  },
			  body: JSON.stringify({}),
			}
		  );
		  if (!resp.ok) {
			if (resp.status === 400) {
			  const errorData = await resp.json();
			  console.error("Error creating user:", errorData.detail);
			  return;
			}
			throw new Error(`error status: ${resp.status}`);
		  }
		},
		getContacts: async () => {
		  const actions = getActions();
		  const exists = await actions.userExists();
		  if (!exists) {
			await actions.createUser();
		  }
		  const resp = await fetch(
			"https://playground.4geeks.com/contact/agendas/vic2580/contacts",
			{
			  method: "GET",
			  headers: {
				"Content-type": "application/json",
			  },
			}
		  );
		  if (!resp.ok) {
			throw new Error(`error status: ${resp.status}`);
		  }
		  let data = await resp.json();
		  console.log(data);
		  setStore({ contacts: data.contacts });
		  return getStore().contacts;
		},
		createContact: async (contact) => {
		  const resp = await fetch(
			"https://playground.4geeks.com/contact/agendas/vic2580/contacts",
			{
			  method: "POST",
			  headers: {
				"Content-type": "application/json",
			  },
			  body: JSON.stringify(contact),
			}
		  );
		  if (!resp.ok) {
			throw new Error(`error status: ${resp.status}`);
		  }
		  await getActions().getContacts();
		},
		deleteContact: async (id) => {
		  const resp = await fetch(
			`https://playground.4geeks.com/contact/agendas/vic2580/contacts/${id}`,
			{
			  method: "DELETE",
			  headers: {
				"Content-type": "application/json",
			  },
			}
		  );
		  if (!resp.ok) {
			throw new Error(`error status: ${resp.status}`);
		  }
		  await getActions().getContacts();
		},
		updateContact: async (id, updatedContact) => {
		  const resp = await fetch(
			`https://playground.4geeks.com/contact/agendas/vic2580/contacts/${id}`,
			{
			  method: "PUT",
			  headers: {
				"Content-type": "application/json",
			  },
			  body: JSON.stringify(updatedContact),
			}
		  );
		  if (!resp.ok) {
			throw new Error(`Error status: ${resp.status}`);
		  }
		  await getActions().getContacts();
		},
	  },
	};
  };
  
  export default getState;
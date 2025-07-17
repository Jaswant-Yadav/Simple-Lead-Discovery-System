function extractContacts(payload) {
  if (!Array.isArray(payload)) {
    throw new Error("Expected array of contacts in request body.");
  }

  const validContacts = payload.filter(contact => contact.email); // must have email

  if (validContacts.length === 0) {
    throw new Error("No valid contacts found.");
  }

  return validContacts.map(contact => ({
    company_id: contact.company_id,
    name: contact.name || "",
    title: contact.title || "",
    email: contact.email,
    linkedin_url: contact.linkedin || contact.linkedin_url || ""
  }));
}

module.exports = extractContacts;

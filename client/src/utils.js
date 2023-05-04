export function fetchDocuments(onFetch, id) {
    
    fetch(`/api/honor_pages`, {
        id,
        credentials: 'include',
    })
    .then(res => {
        if (!res.ok) return;
        res.json().then(honorPages => {
            onFetch(honorPages[0].documents.sort((a,b) => a.id < b.id ? 1 : -1))
        })
    })
}

export const blankLinks = (html) => html.replaceAll("<a ", '<a target="_blank" ');

export const parseDescription = (html) => {
  return blankLinks(html);
};

export const isSafeHTML = html => html.replaceAll('<script', '');

export function fetchDocuments(onFetch, id) {
    console.log('Fetching documents from teh backend server !!!');
    fetch('/api/honor_pages', {
        id,
        credentials: 'include',
    })
    .then(res => {
        if (!res.ok) return;
        res.json().then(honorPages => {
            onFetch(honorPages[0].documents)
        })
    })
}
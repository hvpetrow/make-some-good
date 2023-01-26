export function convertTimestamp(timestamp) {
    return new Date(timestamp.seconds * 1000).toLocaleDateString() + ' ' + timestamp.toDate().toLocaleTimeString()
}
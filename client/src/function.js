export const formatDate = (value) => {
    const date = new Date(value)
    const locale = localStorage.getItem('locale')

    const localeFormat = () => {
        if (locale === 'vi') {
            return 'vi-VN'
        } else if (locale === 'en') {
            return 'en-US'
        }
    }

    return date.toLocaleString(localeFormat(), {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    })
}
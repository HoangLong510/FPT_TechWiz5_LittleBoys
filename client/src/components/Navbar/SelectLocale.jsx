import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useTranslation } from 'react-i18next'
import locales from '~/locales'

export default function SelectLocale() {

    const { i18n } = useTranslation()
    const locale = i18n.language

    const handleChange = (event) => {
        i18n.changeLanguage(event.target.value)
        localStorage.setItem('locale', event.target.value)
    }

    return (
        <FormControl sx={{ width: '100%' }} size="small">
            <InputLabel id="select-locale">Locale</InputLabel>
            <Select
                labelId="select-locale"
                id="demo-select-small"
                value={locale}
                label="Locale"
                onChange={handleChange}
            >
                {locales.map(locale => (
                    <MenuItem key={locale.code} value={locale.code}>{locale.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

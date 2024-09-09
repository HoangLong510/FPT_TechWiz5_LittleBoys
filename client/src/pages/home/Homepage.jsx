import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

export default function Homepage() {

    const { t } = useTranslation()

    return (
        <>
            <Helmet>
				<title>{import.meta.env.VITE_PROJECT_NAME} | {t("Homepage")}</title>
			</Helmet>

            Homepage
        </>
    )
}

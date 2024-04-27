import './App.css'
import { InvestmentsSection } from '#/components/InvestmentsSection.jsx'

import config from '#/config.json'

function App() {
	return (
		<>
			<InvestmentsSection
				config={
					config
				}
			/>
		</>
	)
}

export default App

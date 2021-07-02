import React from 'react'
import { Container } from '../Container'
import { ConverterOptions } from './DownloadOptions'

export const Downloader: React.FC = () => {
	return(
		<Container description="Download Music and Video in your format">
			<ConverterOptions />
		</Container>
	)
}

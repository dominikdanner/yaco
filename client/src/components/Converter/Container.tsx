import React from 'react'

interface Props {
	description?: string
}

export const Container: React.FC<Props> = ({ children, description }) => {
	return (
		<div className="container">
			<div className="download-box">
				<h1><span>Youtube</span> Video Converter</h1>
				<p className="short">{description}</p>
				<div className="content">
					{children}
				</div>
			</div>
		</div>
	)
}
import { FC } from 'react'
import { Container } from '../Container'
import { YoutubeSearch } from './YoutubeSearch'
import '../../style/Converter.css'

/**
 * React Component
 * Implements the youtube search function
 * @returns
 */
export const YoutubeDownloader: FC = () => {
    return (
        <Container description="Download your Music and Videos">
                <YoutubeSearch loading="⏳ Loading..." noResult="🛑 No Result"/>
        </Container>
    )
}
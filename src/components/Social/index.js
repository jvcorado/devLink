import './social.css'

export const Social = ({ children, url }) => {
    return (
        <a className='h-[100px] bg-[#413E3E] flex items-center justify-center rounded-xl' href={url} rel="noopener noreferrer" target="_blank">{children}</a>
    )
}
import { Link, useResolvedPath, useMatch, Outlet } from 'react-router-dom';
// import { useContext } from 'react';
// import UserContext from '../../pages/General/UserContext.jsx';
// import '../../pages/General/General.css';
import styles from './NavBar.module.css';

export function NavBar()
{
    // const { user } = useContext(UserContext);
    function getCookieValue(cookieName)
    {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++)
        {
            const cookie = cookies[i].split('=');
            if (cookie[0] === cookieName)
            {
                return decodeURIComponent(cookie[1]);
            }
        }
        return null;
    }

    return (
        <>
            <div className={ `${ styles.navBar } d-flex flex-column position-fixed` } style={ { width: '300px', height: '100%' } }>
                {/* <ActivePage to={ '/Home' }> */ }
                <div className={ `d-flex align-items-center ${ styles.link }` }>
                    <svg className={ `${ styles.icon }` } viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.155 8.78099L24.33 8.94499L37.402 21.787L36 23.213L34.2 21.445L34.201 35C34.201 36.054 33.385 36.918 32.35 36.994L32.201 37H12.201C11.147 37 10.283 36.184 10.206 35.149L10.201 35L10.2 21.446L8.402 23.213L7 21.787L20.058 8.95799C21.171 7.82199 22.966 7.75899 24.155 8.78099ZM21.569 10.285L21.473 10.372L12.2 19.481L12.201 35L17.2 34.999L17.201 25C17.201 23.946 18.017 23.082 19.052 23.005L19.201 23H25.201C26.255 23 27.119 23.816 27.196 24.851L27.201 25L27.2 34.999L32.201 35L32.2 19.48L22.901 10.344C22.537 9.98699 21.969 9.96499 21.569 10.285ZM25.201 25H19.201L19.2 34.999H25.2L25.201 25Z" stroke="2" />
                    </svg>
                    <Link to={ '/Home' } className={ `${ styles.tab }` }>Home</Link>
                </div>
                {/* </ActivePage> */ }

                {/* <ActivePage to={ '/User' }> */ }
                <div className={ `d-flex align-items-center ${ styles.link }` }>
                    <svg className={ `${ styles.icon }` } viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60.7907 55.0477C59.6316 52.2865 57.9496 49.7785 55.8382 47.6632C53.7333 45.5418 51.2398 43.8505 48.4954 42.6825C48.4709 42.6702 48.4463 42.664 48.4217 42.6516C52.2498 39.8709 54.7383 35.3413 54.7383 30.2309C54.7383 21.765 47.9178 14.9058 39.4998 14.9058C31.0817 14.9058 24.2612 21.765 24.2612 30.2309C24.2612 35.3413 26.7498 39.8709 30.5778 42.6578C30.5533 42.6702 30.5287 42.6764 30.5041 42.6887C27.7513 43.8566 25.2812 45.5313 23.1613 47.6694C21.052 49.7863 19.3702 52.2939 18.2088 55.0539C17.0679 57.7559 16.4526 60.6527 16.3961 63.5877C16.3945 63.6537 16.406 63.7193 16.43 63.7807C16.4539 63.8421 16.4899 63.8981 16.5357 63.9453C16.5815 63.9925 16.6363 64.03 16.6967 64.0557C16.7572 64.0813 16.8221 64.0945 16.8877 64.0944H20.5745C20.8448 64.0944 21.0599 63.8782 21.066 63.6124C21.1889 58.8419 23.0937 54.3741 26.461 50.9878C29.9449 47.484 34.5718 45.556 39.4998 45.556C44.4277 45.556 49.0546 47.484 52.5386 50.9878C55.9058 54.3741 57.8106 58.8419 57.9335 63.6124C57.9397 63.8843 58.1547 64.0944 58.4251 64.0944H62.1118C62.1774 64.0945 62.2424 64.0813 62.3028 64.0557C62.3633 64.03 62.418 63.9925 62.4638 63.9453C62.5096 63.8981 62.5456 63.8421 62.5696 63.7807C62.5935 63.7193 62.605 63.6537 62.6034 63.5877C62.5419 60.6339 61.9336 57.7605 60.7907 55.0477ZM39.4998 40.8596C36.6794 40.8596 34.0249 39.7535 32.028 37.7451C30.031 35.7368 28.9311 33.0673 28.9311 30.2309C28.9311 27.3945 30.031 24.725 32.028 22.7166C34.0249 20.7083 36.6794 19.6022 39.4998 19.6022C42.3201 19.6022 44.9746 20.7083 46.9716 22.7166C48.9686 24.725 50.0684 27.3945 50.0684 30.2309C50.0684 33.0673 48.9686 35.7368 46.9716 37.7451C44.9746 39.7535 42.3201 40.8596 39.4998 40.8596Z" stroke='2' />
                    </svg>
                    <Link to={ '/User' } className={ `${ styles.tab }` }>User</Link>
                </div>
                {/* </ActivePage> */ }

                {
                    getCookieValue('userType') === "Admin" ? (
                        <>
                            {/* <ActivePage to={ '/Staffs' }> */ }
                            <div className={ `d-flex align-items-center ${ styles.link }` }>
                                <svg className={ `${ styles.icon }` } viewBox="-10 -15 80 80" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M53.002 8.00378H16.502C16.227 8.00378 16.002 8.22878 16.002 8.50378V12.0038C16.002 12.2788 16.227 12.5038 16.502 12.5038H53.002C53.277 12.5038 53.502 12.2788 53.502 12.0038V8.50378C53.502 8.22878 53.277 8.00378 53.002 8.00378ZM53.002 25.7538H16.502C16.227 25.7538 16.002 25.9788 16.002 26.2538V29.7538C16.002 30.0288 16.227 30.2538 16.502 30.2538H53.002C53.277 30.2538 53.502 30.0288 53.502 29.7538V26.2538C53.502 25.9788 53.277 25.7538 53.002 25.7538ZM53.002 43.5038H16.502C16.227 43.5038 16.002 43.7288 16.002 44.0038V47.5038C16.002 47.7788 16.227 48.0038 16.502 48.0038H53.002C53.277 48.0038 53.502 47.7788 53.502 47.5038V44.0038C53.502 43.7288 53.277 43.5038 53.002 43.5038ZM2.50195 10.2538C2.50195 10.7134 2.59248 11.1685 2.76837 11.5932C2.94427 12.0178 3.20207 12.4037 3.52708 12.7287C3.85208 13.0537 4.23792 13.3115 4.66256 13.4874C5.0872 13.6633 5.54233 13.7538 6.00195 13.7538C6.46158 13.7538 6.91671 13.6633 7.34135 13.4874C7.76599 13.3115 8.15182 13.0537 8.47683 12.7287C8.80183 12.4037 9.05964 12.0178 9.23553 11.5932C9.41142 11.1685 9.50195 10.7134 9.50195 10.2538C9.50195 9.79416 9.41142 9.33903 9.23553 8.91439C9.05964 8.48975 8.80183 8.10392 8.47683 7.77891C8.15182 7.45391 7.76599 7.1961 7.34135 7.02021C6.91671 6.84431 6.46158 6.75378 6.00195 6.75378C5.54233 6.75378 5.0872 6.84431 4.66256 7.02021C4.23792 7.1961 3.85208 7.45391 3.52708 7.77891C3.20207 8.10392 2.94427 8.48975 2.76837 8.91439C2.59248 9.33903 2.50195 9.79416 2.50195 10.2538ZM2.50195 28.0038C2.50195 28.4634 2.59248 28.9185 2.76837 29.3432C2.94427 29.7678 3.20207 30.1537 3.52708 30.4787C3.85208 30.8037 4.23792 31.0615 4.66256 31.2374C5.0872 31.4133 5.54233 31.5038 6.00195 31.5038C6.46158 31.5038 6.91671 31.4133 7.34135 31.2374C7.76599 31.0615 8.15182 30.8037 8.47683 30.4787C8.80183 30.1537 9.05964 29.7678 9.23553 29.3432C9.41142 28.9185 9.50195 28.4634 9.50195 28.0038C9.50195 27.5442 9.41142 27.089 9.23553 26.6644C9.05964 26.2398 8.80183 25.8539 8.47683 25.5289C8.15182 25.2039 7.76599 24.9461 7.34135 24.7702C6.91671 24.5943 6.46158 24.5038 6.00195 24.5038C5.54233 24.5038 5.0872 24.5943 4.66256 24.7702C4.23792 24.9461 3.85208 25.2039 3.52708 25.5289C3.20207 25.8539 2.94427 26.2398 2.76837 26.6644C2.59248 27.089 2.50195 27.5442 2.50195 28.0038ZM2.50195 45.7538C2.50195 46.2134 2.59248 46.6685 2.76837 47.0932C2.94427 47.5178 3.20207 47.9037 3.52708 48.2287C3.85208 48.5537 4.23792 48.8115 4.66256 48.9874C5.0872 49.1633 5.54233 49.2538 6.00195 49.2538C6.46158 49.2538 6.91671 49.1633 7.34135 48.9874C7.76599 48.8115 8.15182 48.5537 8.47683 48.2287C8.80183 47.9037 9.05964 47.5178 9.23553 47.0932C9.41142 46.6685 9.50195 46.2134 9.50195 45.7538C9.50195 45.2942 9.41142 44.839 9.23553 44.4144C9.05964 43.9897 8.80183 43.6039 8.47683 43.2789C8.15182 42.9539 7.76599 42.6961 7.34135 42.5202C6.91671 42.3443 6.46158 42.2538 6.00195 42.2538C5.54233 42.2538 5.0872 42.3443 4.66256 42.5202C4.23792 42.6961 3.85208 42.9539 3.52708 43.2789C3.20207 43.6039 2.94427 43.9897 2.76837 44.4144C2.59248 44.839 2.50195 45.2942 2.50195 45.7538Z" stroke='2' />
                                </svg>
                                <Link to={ '/Staffs' } className={ `${ styles.tab }` }>Staffs</Link>
                            </div>
                            {/* </ActivePage> */ }

                            {/* <ActivePage to={ '/Students' }> */ }
                            <div className={ `d-flex align-items-center ${ styles.link }` }>
                                <svg className={ `${ styles.icon }` } viewBox="-10 -15 80 80" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M53.002 8.00378H16.502C16.227 8.00378 16.002 8.22878 16.002 8.50378V12.0038C16.002 12.2788 16.227 12.5038 16.502 12.5038H53.002C53.277 12.5038 53.502 12.2788 53.502 12.0038V8.50378C53.502 8.22878 53.277 8.00378 53.002 8.00378ZM53.002 25.7538H16.502C16.227 25.7538 16.002 25.9788 16.002 26.2538V29.7538C16.002 30.0288 16.227 30.2538 16.502 30.2538H53.002C53.277 30.2538 53.502 30.0288 53.502 29.7538V26.2538C53.502 25.9788 53.277 25.7538 53.002 25.7538ZM53.002 43.5038H16.502C16.227 43.5038 16.002 43.7288 16.002 44.0038V47.5038C16.002 47.7788 16.227 48.0038 16.502 48.0038H53.002C53.277 48.0038 53.502 47.7788 53.502 47.5038V44.0038C53.502 43.7288 53.277 43.5038 53.002 43.5038ZM2.50195 10.2538C2.50195 10.7134 2.59248 11.1685 2.76837 11.5932C2.94427 12.0178 3.20207 12.4037 3.52708 12.7287C3.85208 13.0537 4.23792 13.3115 4.66256 13.4874C5.0872 13.6633 5.54233 13.7538 6.00195 13.7538C6.46158 13.7538 6.91671 13.6633 7.34135 13.4874C7.76599 13.3115 8.15182 13.0537 8.47683 12.7287C8.80183 12.4037 9.05964 12.0178 9.23553 11.5932C9.41142 11.1685 9.50195 10.7134 9.50195 10.2538C9.50195 9.79416 9.41142 9.33903 9.23553 8.91439C9.05964 8.48975 8.80183 8.10392 8.47683 7.77891C8.15182 7.45391 7.76599 7.1961 7.34135 7.02021C6.91671 6.84431 6.46158 6.75378 6.00195 6.75378C5.54233 6.75378 5.0872 6.84431 4.66256 7.02021C4.23792 7.1961 3.85208 7.45391 3.52708 7.77891C3.20207 8.10392 2.94427 8.48975 2.76837 8.91439C2.59248 9.33903 2.50195 9.79416 2.50195 10.2538ZM2.50195 28.0038C2.50195 28.4634 2.59248 28.9185 2.76837 29.3432C2.94427 29.7678 3.20207 30.1537 3.52708 30.4787C3.85208 30.8037 4.23792 31.0615 4.66256 31.2374C5.0872 31.4133 5.54233 31.5038 6.00195 31.5038C6.46158 31.5038 6.91671 31.4133 7.34135 31.2374C7.76599 31.0615 8.15182 30.8037 8.47683 30.4787C8.80183 30.1537 9.05964 29.7678 9.23553 29.3432C9.41142 28.9185 9.50195 28.4634 9.50195 28.0038C9.50195 27.5442 9.41142 27.089 9.23553 26.6644C9.05964 26.2398 8.80183 25.8539 8.47683 25.5289C8.15182 25.2039 7.76599 24.9461 7.34135 24.7702C6.91671 24.5943 6.46158 24.5038 6.00195 24.5038C5.54233 24.5038 5.0872 24.5943 4.66256 24.7702C4.23792 24.9461 3.85208 25.2039 3.52708 25.5289C3.20207 25.8539 2.94427 26.2398 2.76837 26.6644C2.59248 27.089 2.50195 27.5442 2.50195 28.0038ZM2.50195 45.7538C2.50195 46.2134 2.59248 46.6685 2.76837 47.0932C2.94427 47.5178 3.20207 47.9037 3.52708 48.2287C3.85208 48.5537 4.23792 48.8115 4.66256 48.9874C5.0872 49.1633 5.54233 49.2538 6.00195 49.2538C6.46158 49.2538 6.91671 49.1633 7.34135 48.9874C7.76599 48.8115 8.15182 48.5537 8.47683 48.2287C8.80183 47.9037 9.05964 47.5178 9.23553 47.0932C9.41142 46.6685 9.50195 46.2134 9.50195 45.7538C9.50195 45.2942 9.41142 44.839 9.23553 44.4144C9.05964 43.9897 8.80183 43.6039 8.47683 43.2789C8.15182 42.9539 7.76599 42.6961 7.34135 42.5202C6.91671 42.3443 6.46158 42.2538 6.00195 42.2538C5.54233 42.2538 5.0872 42.3443 4.66256 42.5202C4.23792 42.6961 3.85208 42.9539 3.52708 43.2789C3.20207 43.6039 2.94427 43.9897 2.76837 44.4144C2.59248 44.839 2.50195 45.2942 2.50195 45.7538Z" stroke='2' />
                                </svg>
                                <Link to={ '/Students' } className={ `${ styles.tab }` }>Students</Link>
                            </div>
                            {/* </ActivePage> */ }

                            {/* <ActivePage to={ '/Classes' }> */ }
                            <div className={ `d-flex align-items-center ${ styles.link }` }>
                                <svg className={ `${ styles.icon }` } viewBox="-10 -15 80 80" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M53.002 8.00378H16.502C16.227 8.00378 16.002 8.22878 16.002 8.50378V12.0038C16.002 12.2788 16.227 12.5038 16.502 12.5038H53.002C53.277 12.5038 53.502 12.2788 53.502 12.0038V8.50378C53.502 8.22878 53.277 8.00378 53.002 8.00378ZM53.002 25.7538H16.502C16.227 25.7538 16.002 25.9788 16.002 26.2538V29.7538C16.002 30.0288 16.227 30.2538 16.502 30.2538H53.002C53.277 30.2538 53.502 30.0288 53.502 29.7538V26.2538C53.502 25.9788 53.277 25.7538 53.002 25.7538ZM53.002 43.5038H16.502C16.227 43.5038 16.002 43.7288 16.002 44.0038V47.5038C16.002 47.7788 16.227 48.0038 16.502 48.0038H53.002C53.277 48.0038 53.502 47.7788 53.502 47.5038V44.0038C53.502 43.7288 53.277 43.5038 53.002 43.5038ZM2.50195 10.2538C2.50195 10.7134 2.59248 11.1685 2.76837 11.5932C2.94427 12.0178 3.20207 12.4037 3.52708 12.7287C3.85208 13.0537 4.23792 13.3115 4.66256 13.4874C5.0872 13.6633 5.54233 13.7538 6.00195 13.7538C6.46158 13.7538 6.91671 13.6633 7.34135 13.4874C7.76599 13.3115 8.15182 13.0537 8.47683 12.7287C8.80183 12.4037 9.05964 12.0178 9.23553 11.5932C9.41142 11.1685 9.50195 10.7134 9.50195 10.2538C9.50195 9.79416 9.41142 9.33903 9.23553 8.91439C9.05964 8.48975 8.80183 8.10392 8.47683 7.77891C8.15182 7.45391 7.76599 7.1961 7.34135 7.02021C6.91671 6.84431 6.46158 6.75378 6.00195 6.75378C5.54233 6.75378 5.0872 6.84431 4.66256 7.02021C4.23792 7.1961 3.85208 7.45391 3.52708 7.77891C3.20207 8.10392 2.94427 8.48975 2.76837 8.91439C2.59248 9.33903 2.50195 9.79416 2.50195 10.2538ZM2.50195 28.0038C2.50195 28.4634 2.59248 28.9185 2.76837 29.3432C2.94427 29.7678 3.20207 30.1537 3.52708 30.4787C3.85208 30.8037 4.23792 31.0615 4.66256 31.2374C5.0872 31.4133 5.54233 31.5038 6.00195 31.5038C6.46158 31.5038 6.91671 31.4133 7.34135 31.2374C7.76599 31.0615 8.15182 30.8037 8.47683 30.4787C8.80183 30.1537 9.05964 29.7678 9.23553 29.3432C9.41142 28.9185 9.50195 28.4634 9.50195 28.0038C9.50195 27.5442 9.41142 27.089 9.23553 26.6644C9.05964 26.2398 8.80183 25.8539 8.47683 25.5289C8.15182 25.2039 7.76599 24.9461 7.34135 24.7702C6.91671 24.5943 6.46158 24.5038 6.00195 24.5038C5.54233 24.5038 5.0872 24.5943 4.66256 24.7702C4.23792 24.9461 3.85208 25.2039 3.52708 25.5289C3.20207 25.8539 2.94427 26.2398 2.76837 26.6644C2.59248 27.089 2.50195 27.5442 2.50195 28.0038ZM2.50195 45.7538C2.50195 46.2134 2.59248 46.6685 2.76837 47.0932C2.94427 47.5178 3.20207 47.9037 3.52708 48.2287C3.85208 48.5537 4.23792 48.8115 4.66256 48.9874C5.0872 49.1633 5.54233 49.2538 6.00195 49.2538C6.46158 49.2538 6.91671 49.1633 7.34135 48.9874C7.76599 48.8115 8.15182 48.5537 8.47683 48.2287C8.80183 47.9037 9.05964 47.5178 9.23553 47.0932C9.41142 46.6685 9.50195 46.2134 9.50195 45.7538C9.50195 45.2942 9.41142 44.839 9.23553 44.4144C9.05964 43.9897 8.80183 43.6039 8.47683 43.2789C8.15182 42.9539 7.76599 42.6961 7.34135 42.5202C6.91671 42.3443 6.46158 42.2538 6.00195 42.2538C5.54233 42.2538 5.0872 42.3443 4.66256 42.5202C4.23792 42.6961 3.85208 42.9539 3.52708 43.2789C3.20207 43.6039 2.94427 43.9897 2.76837 44.4144C2.59248 44.839 2.50195 45.2942 2.50195 45.7538Z" stroke='2' />
                                </svg>
                                <Link to={ '/Classes' } className={ `${ styles.tab }` }>Classes</Link>
                            </div>
                            {/* </ActivePage> */ }
                        </>
                    ) :
                        (<>
                            {/* <ActivePage to={ '/MyClasses' }> */ }
                            <div className={ `d-flex align-items-center ${ styles.link }` } name="my_classes">
                                <svg className={ `${ styles.icon }` } viewBox="-10 -15 80 80" xmlns="http://www.w3.org/2000/svg" name="my_classes">
                                    {/* <g clip-path="url(#clip0_50_1827)"> */ }
                                    <path d="M53.1411 0H8.8554C7.63062 0 6.64111 0.989509 6.64111 2.21429V59.7857C6.64111 61.0105 7.63062 62 8.8554 62H53.1411C54.3659 62 55.3554 61.0105 55.3554 59.7857V2.21429C55.3554 0.989509 54.3659 0 53.1411 0ZM35.15 4.98214H41.7929V19.5065L38.5753 17.1607L35.15 19.6103V4.98214ZM50.3733 57.0179H11.6233V4.98214H30.9983V25.5266C30.9983 25.7549 31.0675 25.9833 31.2058 26.1701C31.2899 26.2888 31.3966 26.3898 31.5198 26.467C31.6431 26.5442 31.7805 26.5963 31.924 26.6201C32.0675 26.6439 32.2143 26.639 32.3559 26.6057C32.4975 26.5724 32.6311 26.5114 32.7489 26.4261L38.5476 22.2812L44.1802 26.3915C44.367 26.5299 44.5954 26.606 44.8306 26.606C45.4396 26.606 45.9378 26.1078 45.9378 25.4989V4.98214H50.3663V57.0179H50.3733Z" stroke='2' />
                                    {/* </g>
                                    <defs>
                                        <clipPath id="clip0_50_1827">
                                            <rect width="62" height="62" fill="white" />
                                        </clipPath>
                                    </defs> */}
                                </svg>
                                <Link to={ '/MyClasses' } className={ `${ styles.tab }` } name="my_classes">My Classes</Link>
                            </div>
                            {/* </ActivePage> */ }
                        </>
                        )
                }
                <div className={ `d-flex align-items-center ${ styles.link } mt-auto` }>
                    <svg className={ `${ styles.icon }` } viewBox="-10 -20 80 80" xmlns="http://www.w3.org/2000/svg">
                        <path d="M46.553 37.7907H42.3894C42.1051 37.7907 41.8386 37.9128 41.6609 38.1279C41.2464 38.6221 40.8022 39.0989 40.3343 39.5523C38.4206 41.4327 36.1539 42.9313 33.6595 43.9651C31.0752 45.0366 28.2976 45.5863 25.4922 45.5814C22.6553 45.5814 19.9072 45.0349 17.3249 43.9651C14.8305 42.9313 12.5638 41.4327 10.6502 39.5523C8.73311 37.6783 7.20449 35.4571 6.14898 33.0117C5.0533 30.4768 4.5025 27.7849 4.5025 25C4.5025 22.2152 5.05922 19.5233 6.14898 16.9884C7.20321 14.5408 8.71939 12.3373 10.6502 10.4477C12.5809 8.55821 14.8256 7.06984 17.3249 6.03496C19.9072 4.9652 22.6553 4.41868 25.4922 4.41868C28.3292 4.41868 31.0772 4.95938 33.6595 6.03496C36.1588 7.06984 38.4035 8.55821 40.3343 10.4477C40.8022 10.907 41.2404 11.3838 41.6609 11.8722C41.8386 12.0873 42.1111 12.2094 42.3894 12.2094H46.553C46.9261 12.2094 47.1571 11.8024 46.9498 11.4943C42.4072 4.56403 34.459 -0.0231678 25.4271 8.80154e-05C11.2365 0.0349717 -0.140825 11.3431 0.00131751 25.2559C0.14346 38.9477 11.503 50 25.4922 50C34.5005 50 42.4131 45.4186 46.9498 38.5058C47.1512 38.1977 46.9261 37.7907 46.553 37.7907ZM51.8182 24.6338L43.414 18.1222C43.1001 17.878 42.6441 18.0989 42.6441 18.4884V22.907H24.0471C23.7865 22.907 23.5733 23.1163 23.5733 23.3721V26.6279C23.5733 26.8838 23.7865 27.0931 24.0471 27.0931H42.6441V31.5117C42.6441 31.9012 43.1061 32.1221 43.414 31.8779L51.8182 25.3663C51.8748 25.3228 51.9206 25.2672 51.9521 25.2038C51.9836 25.1403 52 25.0706 52 25C52 24.9295 51.9836 24.8598 51.9521 24.7963C51.9206 24.7329 51.8748 24.6773 51.8182 24.6338Z" stroke='2' />
                    </svg>
                    <Link to='/' className={ `${ styles.tab }` }>Log out</Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}

// function ActivePage({ to, children })
// {
//     const resolvedPath = useResolvedPath(to);
//     const isActive = useMatch({ path: resolvedPath.pathname, end: true });
//     return (
//         <div className={ isActive ? "pageName-container active" : "pageName-container" }>
//             { children }
//         </div>
//     )
// }
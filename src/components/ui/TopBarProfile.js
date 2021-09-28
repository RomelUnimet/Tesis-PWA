import React from 'react';
import '../../scss/ui/topbar.scss'


export const TopBarProfile = ({diaryName, visible}) => {

    

    return (
        <div className="topbar-container">
            <div className="topbar-container-layout">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="search-svg"
                >
                    <path d="M32.625 31.0342L24.129 22.5382C26.1706 20.0872 27.1887 16.9434 26.9714 13.7608C26.7542 10.5783 25.3184 7.60201 22.9626 5.45115C20.6068 3.30029 17.5125 2.14046 14.3234 2.21292C11.1343 2.28538 8.09584 3.58457 5.84021 5.84021C3.58457 8.09584 2.28538 11.1343 2.21292 14.3234C2.14046 17.5125 3.30029 20.6068 5.45115 22.9626C7.60201 25.3184 10.5783 26.7542 13.7608 26.9714C16.9434 27.1887 20.0872 26.1706 22.5382 24.129L31.0342 32.625L32.625 31.0342ZM4.49995 14.6249C4.49995 12.6224 5.09377 10.6648 6.20632 8.9998C7.31887 7.33475 8.90018 6.037 10.7503 5.27067C12.6004 4.50433 14.6362 4.30382 16.6002 4.6945C18.5643 5.08517 20.3684 6.04948 21.7844 7.46549C23.2004 8.8815 24.1647 10.6856 24.5554 12.6497C24.9461 14.6137 24.7456 16.6495 23.9792 18.4996C23.2129 20.3497 21.9151 21.931 20.2501 23.0436C18.5851 24.1561 16.6275 24.75 14.6249 24.75C11.9405 24.747 9.36694 23.6793 7.46878 21.7811C5.57062 19.883 4.50292 17.3094 4.49995 14.6249Z"/>
                </svg>
                {
                    visible &&
                    <h1> {diaryName===""?  diaryName : 'Diary Name' } </h1>

                }

                <svg viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"
                     className="search-svg" //No es Search
                >
                    <path d="M36.2812 22.5212V21.5V20.4653L38.8612 18.2078C39.3368 17.7886 39.6489 17.2148 39.7423 16.5878C39.8357 15.9607 39.7045 15.3209 39.3718 14.7812L36.2006 9.40622C35.9649 8.99807 35.6261 8.65907 35.2181 8.42321C34.81 8.18736 34.3472 8.06295 33.8759 8.06247C33.5838 8.06023 33.2933 8.10562 33.0159 8.19684L29.7506 9.29872C29.1868 8.92409 28.5987 8.58741 27.9903 8.2909L27.3049 4.90465C27.1821 4.286 26.8455 3.73027 26.3542 3.33475C25.8629 2.93924 25.2481 2.72913 24.6174 2.74122H18.3287C17.6981 2.72913 17.0833 2.93924 16.592 3.33475C16.1006 3.73027 15.7641 4.286 15.6412 4.90465L14.9559 8.2909C14.343 8.58734 13.7505 8.92401 13.1821 9.29872L9.984 8.14309C9.70356 8.07002 9.41314 8.0428 9.124 8.06247C8.65272 8.06295 8.18984 8.18736 7.78182 8.42321C7.37379 8.65907 7.03496 8.99807 6.79932 9.40622L3.62807 14.7812C3.31442 15.32 3.19787 15.9512 3.29838 16.5665C3.39889 17.1818 3.7102 17.743 4.179 18.154L6.71869 20.4787V22.5347L4.179 24.7922C3.69696 25.206 3.37713 25.7773 3.27627 26.4046C3.17541 27.0319 3.30005 27.6746 3.62807 28.2187L6.79932 33.5937C7.03496 34.0019 7.37379 34.3409 7.78182 34.5767C8.18984 34.8126 8.65272 34.937 9.124 34.9375C9.41607 34.9397 9.70654 34.8943 9.984 34.8031L13.2493 33.7012C13.8131 34.0758 14.4011 34.4125 15.0096 34.709L15.6949 38.0953C15.8178 38.7139 16.1544 39.2697 16.6457 39.6652C17.137 40.0607 17.7518 40.2708 18.3824 40.2587H24.7249C25.3556 40.2708 25.9704 40.0607 26.4617 39.6652C26.953 39.2697 27.2896 38.7139 27.4124 38.0953L28.0978 34.709C28.7106 34.4126 29.3031 34.0759 29.8715 33.7012L33.1234 34.8031C33.4008 34.8943 33.6913 34.9397 33.9834 34.9375C34.4547 34.937 34.9175 34.8126 35.3256 34.5767C35.7336 34.3409 36.0724 34.0019 36.3081 33.5937L39.3718 28.2187C39.6855 27.6799 39.802 27.0488 39.7015 26.4335C39.601 25.8181 39.2897 25.2569 38.8209 24.8459L36.2812 22.5212ZM33.8759 32.25L29.2668 30.6912C28.1879 31.6051 26.9548 32.3195 25.6253 32.8009L24.6712 37.625H18.3287L17.3746 32.8547C16.0556 32.3596 14.8292 31.6464 13.7465 30.745L9.124 32.25L5.95275 26.875L9.60775 23.65C9.35929 22.259 9.35929 20.835 9.60775 19.444L5.95275 16.125L9.124 10.75L13.7331 12.3087C14.812 11.3948 16.0451 10.6804 17.3746 10.199L18.3287 5.37497H24.6712L25.6253 10.1453C26.9442 10.6403 28.1707 11.3535 29.2534 12.255L33.8759 10.75L37.0471 16.125L33.3921 19.35C33.6406 20.7409 33.6406 22.1649 33.3921 23.5559L37.0471 26.875L33.8759 32.25Z"/>
                    <path d="M21.5 29.5625C19.9054 29.5625 18.3466 29.0896 17.0207 28.2037C15.6948 27.3178 14.6615 26.0586 14.0512 24.5854C13.441 23.1122 13.2813 21.4911 13.5924 19.9271C13.9035 18.3631 14.6714 16.9265 15.799 15.799C16.9265 14.6714 18.3631 13.9035 19.9271 13.5924C21.4911 13.2813 23.1122 13.441 24.5854 14.0512C26.0586 14.6615 27.3178 15.6948 28.2037 17.0207C29.0896 18.3466 29.5625 19.9054 29.5625 21.5C29.5733 22.5618 29.3721 23.615 28.9707 24.5981C28.5694 25.5812 27.9759 26.4742 27.2251 27.2251C26.4742 27.9759 25.5812 28.5694 24.5981 28.9707C23.615 29.3721 22.5618 29.5733 21.5 29.5625ZM21.5 16.125C20.7896 16.1085 20.0833 16.2362 19.4237 16.5004C18.7641 16.7647 18.1649 17.16 17.6625 17.6625C17.16 18.1649 16.7647 18.7641 16.5004 19.4237C16.2362 20.0833 16.1085 20.7896 16.125 21.5C16.1085 22.2104 16.2362 22.9167 16.5004 23.5763C16.7647 24.2359 17.16 24.8351 17.6625 25.3375C18.1649 25.84 18.7641 26.2353 19.4237 26.4996C20.0833 26.7638 20.7896 26.8916 21.5 26.875C22.2104 26.8916 22.9167 26.7638 23.5763 26.4996C24.2359 26.2353 24.8351 25.84 25.3375 25.3375C25.84 24.8351 26.2353 24.2359 26.4996 23.5763C26.7638 22.9167 26.8916 22.2104 26.875 21.5C26.8916 20.7896 26.7638 20.0833 26.4996 19.4237C26.2353 18.7641 25.84 18.1649 25.3375 17.6625C24.8351 17.16 24.2359 16.7647 23.5763 16.5004C22.9167 16.2362 22.2104 16.1085 21.5 16.125Z" />
                </svg>
            </div>
        </div>
    )
}

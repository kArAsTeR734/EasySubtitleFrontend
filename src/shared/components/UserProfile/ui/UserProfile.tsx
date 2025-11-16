import './UserProfile.scss'
import {useRef} from "react";
import {useHover} from "../../../hooks/useHover.ts";
import clsx from "clsx";
import {useAppSelector} from "../../../hooks/redux.ts";

const UserProfile = () => {

  const anchorRef = useRef<HTMLAnchorElement>(null);
  const {id,login} = useAppSelector(state => state.userReducer)
  const isHovering = useHover(anchorRef);
  return (
      <>
        <div className="user-profile">
          <p className="user-profile__name">
            <span>{login}</span>
          </p>
          <div className="user-profile__about">
            <a ref={anchorRef}
               href="#"
               className="user-profile__image">
              <img src="/src/assets/profile-icon.svg"
                   alt="profile"
                   width="64"
                   height="64"
                   loading="lazy"/>
            </a>
            <div className={clsx("user-profile__data",{
              "user-profile__data--visible":isHovering,
              "user-profile__data--hidden":!isHovering
            })}>
              <p className="user-profile__id">id: {id}</p>
              <p className="user-profile__login">{login}</p>
            </div>
          </div>
        </div>
      </>
  );
};

export default UserProfile;
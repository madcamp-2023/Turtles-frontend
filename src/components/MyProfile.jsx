//MyProfile.jsx

import React, { useState, useEffect } from 'react';
import './MyProfile.css';
import BioModal from './BioModal';

const MyProfile = () => {

  const github_id = localStorage.getItem("github_id");
  const name = localStorage.getItem("name");
  const profile_img = localStorage.getItem("profile_img");

  const [userData, setUserData] = useState({
    profilePicture: profile_img,
    name: name,
    id: github_id,
    bio: '한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.',

  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleUpdateBio = (newBio) => {
    setUserData(prevState => ({
      ...prevState,
      bio: newBio
    }));
  };

  return (
    <div className="my-profile">
      {/* 상단 컨테이너: 프로필 사진과 사용자 이름, 아이디를 포함 */}
      <div className="my-info-top">
        <div className="profile-picture">
          <img src={userData.profilePicture} alt={`${userData.name}'s profile`} />
        </div>
        <div className="my-info-container">
          <div className="my-info">{userData.name}</div>
          <div className="my-id">@{userData.id}</div>
        </div>
      </div>
      {/* 하단 컨테이너: 한줄 소개와 버튼을 포함 */}
      <div className="my-bio-container">
        <div className="my-bio">{userData.bio}</div>
        {/* 버튼을 여기에 둘 수도 있고, 아니면 제거할 수도 있습니다. */}
        <button className="bio-button" onClick={handleClick}>Button</button>
      </div>

      {isModalOpen && (
        <BioModal onClose={handleCloseModal} onUpdateBio={handleUpdateBio}>
          {/* 모달 내부에 들어갈 내용 */}
        </BioModal>
      )}
    </div>
  );

};

export default MyProfile;

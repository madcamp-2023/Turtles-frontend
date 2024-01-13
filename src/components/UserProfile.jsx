import React, { useState, useEffect } from 'react';
import './UserProfile.css';

// UserProfile 컴포넌트
const UserProfile = () => {

    const defaultProfilePicture = './mango.png';

    // 사용자 데이터 상태
    const [userData, setUserData] = useState({
        profilePicture: defaultProfilePicture,
        name: '박은수',
        id: 'es10130813',
        bio: '한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개한줄소개',

    });

    // 서버로부터 사용자 데이터를 가져오는 함수
    const fetchUserData = async () => {
        try {
            // API 호출을 통해 사용자 데이터를 가져옴 (이 부분은 실제 API 주소로 대체해야 함)
            const response = await fetch('/api/user-data');
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // 컴포넌트 마운트 시 사용자 데이터를 가져옴
    useEffect(() => {
        fetchUserData();
    }, []);

    // 로딩 상태 처리 (실제로는 스피너나 로딩 컴포넌트를 사용할 수 있음)
    if (!userData.name) {
        return <div>Loading...</div>;
    }

    return (
      <div className="user-profile">
        {/* 프로필 사진 */}
        <div className="profile-picture">
          <img src={userData.profilePicture} alt={`${userData.name}'s profile`} />
        </div>
        {/* 사용자 정보 컨테이너 */}
        <div className="user-info-container">
          <div className="user-info">{userData.name}</div>
          <div className="user-id">@{userData.id}</div>
          <div className="user-bio">{userData.bio}</div>
        </div>
      </div>
  );
};

export default UserProfile;

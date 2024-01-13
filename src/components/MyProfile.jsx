import React, { useState, useEffect } from 'react';
import './MyProfile.css';

const MyProfile = () => {

    const defaultProfilePicture = './mango.png';

    const [userData, setUserData] = useState({
        profilePicture: defaultProfilePicture,
        name: '박은수',
        id: 'es10130813',
        bio: '한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.한줄소개입니다.',

    });

    // 서버로부터 데이터를 가져오는 함수
    const fetchUserData = async () => {
        try {
            // API 호출을 통해 데이터를 가져옴 (이 부분은 실제 API 주소로 대체해야 함)
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
            <button className="bio-button">Button</button>
          </div>
        </div>
      );
      
};

export default MyProfile;

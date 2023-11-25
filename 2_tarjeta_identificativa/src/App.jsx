import { useState } from "react";
import "./App.css";
import styled from "@emotion/styled";

const usersData = [
  {
    name: "EUGENIO",
    surname: "RUIZ DOMENECH",
    username: "eugenio_98",
    gender: "male",
    birthdate: "05/04/1998",
    age: 25,
    email: "eugenio_98@hotmail.com",
    province: "Sevilla",
    image: "https://randomuser.me/api/portraits/lego/1.jpg",
  },
  // Add more user data objects here...
];

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const UserCard = styled.div`
  width: 300px;
  border-radius: 8px;
  padding: 20px;
  text-align: left;
  border: 3px solid ${(props) => props.borderColor || "#ccc"};
`;

const Image = styled.img`
  border-radius: 8px;
  height: 130px;
  width: 130px;
`;

const UserName = styled.div`
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  background-color: ${(props) => props.backgroundColor || "white"};
  color: black;
  padding: 8px;
  margin-bottom: 10px;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Provincia = styled.div`
  font-size: 15px;
`;

function App() {
  return (
    <FlexContainer>
      {usersData.map((user, index) => {
        const randomColor = generateRandomColor();
        return (
          <UserCard key={index} borderColor={randomColor}>
            <UserName backgroundColor={randomColor}> {user.username}</UserName>
            <div style={{ display: "flex" }}>
              <Image src={user.image} alt={`${user.name} ${user.surname}`} />
              <UserText>
                <Name>{user.name}</Name>
                <div>{user.surname}</div> <br />
                <Provincia>{user.province}</Provincia>
                <p style={{ fontSize: "10px" }}>
                  {user.birthdate} ({user.age} años)
                </p>
              </UserText>
            </div>
            <p>{user.email}</p>
          </UserCard>
        );
      })}
    </FlexContainer>
  );
}

export default App;

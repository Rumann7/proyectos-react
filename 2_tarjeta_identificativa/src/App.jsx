import { useEffect, useState } from "react";
import "./App.css";
import styled from "@emotion/styled";

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  gap: 20px;
`;

// capricho mio, me encanta como queda honestamente
const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const UserCard = styled.div`
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

const Encabecado = styled.header`
  background-color: green;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  font-weight: bold;
  font-size: 50px;
  padding: ;
`;

function App() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://randomuser.me/api/?nat=es&results=10"
        );
        const data = await response.json();
        const users = data.results.map((user) => ({
          name: user.name.first.toUpperCase(),
          surname: user.name.last.toUpperCase(),
          username: user.login.username,
          gender: user.gender,
          birthdate: user.dob.date,
          age: user.dob.age,
          email: user.email,
          province: user.location.state,
          image: getImageURL(user),
        }));
        setUsersData(users);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getImageURL = (user) => {
    const getRandomInt = (max) => Math.floor(Math.random() * max);
    return `https://randomuser.me/api/portraits/${
      user.gender === "female" ? "women" : "men"
    }/${getRandomInt(100)}.jpg`;
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Ocurrió un error al cargar los datos.</div>;
  }

  return (
    <>
      <Encabecado> EJERCICIO 2 REACT </Encabecado> <br /> <br /> <br />
      <FlexContainer>
        {usersData.map((user, index) => {
          const randomColor = generateRandomColor();
          return (
            <UserCard key={index} borderColor={randomColor}>
              <UserName backgroundColor={randomColor}>{user.username}</UserName>
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
    </>
  );
}

export default App;

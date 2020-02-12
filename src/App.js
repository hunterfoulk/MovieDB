import React, { useEffect, useState } from "react";
import "./App.css";
import { useStateValue } from "./State";
import Header from "./components/Header";
import Search from "./components/Search";
import axios from "axios";
import { Modal, Col, Card, Row, Tag, Typography, Button } from "antd";
import "antd/dist/antd.css";
const { Meta } = Card;
const TextTitle = Typography.Title;

//display cards
const MovieBoxes = ({
  Title,
  imdbID,
  Poster,
  Type,
  ShowDetail,
  DetailRequest,
  modalOpen
}) => {
  const HandleClick = () => {
    // Display Modal & get specific movie ID
    modalOpen(true);
    DetailRequest(true);

    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=7305ce7b`)
      .then(resp => resp)
      .then(resp => resp.json())
      .then(response => {
        DetailRequest(false);
        ShowDetail(response);
      });
  };

  return (
    <Col
      style={{ margin: "30px", padding: "30px" }}
      className="gutter-row"
      span={4}
    >
      <div className="gutter-box">
        <Card
          style={{ height: 530, width: 270 }}
          cover={
            <img
              className="movie-posters"
              alt={Title}
              src={
                Poster === "N/A"
                  ? "https://placehold.it/198x264&text=Image+Not+Found"
                  : Poster
              }
            />
          }
        >
          <Meta title={Title} />
          <Row style={{ marginTop: "10px" }} className="gutter-row">
            <Col>
              <Tag color="red">{Type}</Tag>
            </Col>
            <Button style={{ marginTop: "10px" }} type="primary">
              Watch Now
            </Button>
            <Button
              onClick={() => HandleClick()}
              style={{ bottom: 32, marginLeft: "120px" }}
            >
              View Details
            </Button>
          </Row>
        </Card>
      </div>
    </Col>
  );
};

const MovieDetail = ({
  Title,
  Poster,
  imdbRating,
  Rated,
  Runtime,
  Genre,
  Plot
}) => {
  return (
    <Row>
      <Col span={11}>
        <img
          src={
            Poster === "N/A"
              ? "https://placehold.it/198x264&text=Image+Not+Found"
              : Poster
          }
          alt={Title}
        />
      </Col>
      <Col span={13}>
        <Row>
          <Col span={21}>
            <TextTitle level={7}>{Title}</TextTitle>
          </Col>
          <Col span={3} style={{ textAlign: "right" }}>
            <TextTitle level={4}>
              <span style={{ color: "#41A8F8" }}>{imdbRating}</span>
            </TextTitle>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <Tag>{Rated}</Tag>
            <Tag>{Runtime}</Tag>
            <Tag>{Genre}</Tag>
          </Col>
        </Row>
        <Row>
          <Col>{Plot}</Col>
        </Row>
      </Col>
    </Row>
  );
};

function App() {
  const [{ movies }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState(false);
  const [details, setShowDetails] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?s=man&apikey=7305ce7b`)
      .then(jsonResponse => {
        dispatch({
          type: "Movies",
          movies: jsonResponse.data.Search
        });
      });
  }, []);

  const search = searchValue => {
    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=7305ce7b`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "Movies",
            movies: jsonResponse.data.Search
          });
        }
      }
    );
  };

  return (
    <>
      <Header />
      <div className="containerapp">
        <Search search={search} />

        {movies !== null &&
          movies.length > 0 &&
          movies.map((result, index) => (
            <MovieBoxes
              ShowDetail={setShowDetails}
              DetailRequest={setDetailRequest}
              modalOpen={setModalOpen}
              key={index}
              {...result}
            />
          ))}

        <Modal
          title="Movie Details!"
          centered
          visible={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          width={800}
        >
          {detailRequest === false ? <MovieDetail {...details} /> : null}
        </Modal>
      </div>
    </>
  );
}
export default App;

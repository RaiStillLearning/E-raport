import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Form, ListGroup, Spinner } from "react-bootstrap";

const PesertaDidik = () => {
  const [kelasList, setKelasList] = useState([]);
  const [selectedKelasId, setSelectedKelasId] = useState("");
  const [kelasDetail, setKelasDetail] = useState(null);
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/Kelas")
      .then((res) => {
        setKelasList(res.data.data);
      })
      .catch((err) => {
        console.error("Gagal ambil data kelas:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedKelasId) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/Kelas/${selectedKelasId}`)
        .then((res) => {
          setKelasDetail(res.data.data.kelas);
          setSiswaList(res.data.data.siswa);
        })
        .catch((err) => {
          console.error("Gagal ambil data siswa:", err);
        })
        .finally(() => setLoading(false));
    } else {
      setKelasDetail(null);
      setSiswaList([]);
    }
  }, [selectedKelasId]);

  return (
    <Container
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ padding: "1rem" }}
    >
      <Card
        style={{ width: "100%", maxWidth: "600px" }}
        className="p-4 shadow-sm"
      >
        <h3 className="mb-4 text-center">Daftar Siswa per Kelas</h3>

        <Form.Group className="mb-3">
          <Form.Label>Pilih Kelas</Form.Label>
          <Form.Select
            value={selectedKelasId}
            onChange={(e) => setSelectedKelasId(e.target.value)}
          >
            <option value="">-- Pilih Kelas --</option>
            {kelasList.map((kelas) => (
              <option key={kelas._id} value={kelas._id}>
                {kelas.nama_kelas}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {loading && (
          <div className="text-center my-3">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {!loading && kelasDetail && (
          <>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{kelasDetail.nama_kelas}</Card.Title>
                <Card.Subtitle className="text-muted">
                  Wali Kelas: {kelasDetail.wali_kelas}
                </Card.Subtitle>
              </Card.Body>
            </Card>

            <h5>Daftar Siswa:</h5>
            <ListGroup>
              {siswaList.length > 0 ? (
                siswaList.map((siswa) => (
                  <ListGroup.Item key={siswa._id}>
                    {siswa.absen}. {siswa.nama}
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item className="text-muted text-center">
                  Belum ada siswa di kelas ini.
                </ListGroup.Item>
              )}
            </ListGroup>
          </>
        )}
      </Card>
    </Container>
  );
};

export default PesertaDidik;

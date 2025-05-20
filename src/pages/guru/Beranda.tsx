import React, { useState } from "react";
import axios from "axios";
import { Table, Button, Form, Card } from "react-bootstrap";

interface NilaiInput {
  no: number;
  mata_pelajaran: string;
  rombel: string;
  wali_kelas: string;
  jmi_peserta_didik: string;
  jmi_peserta_didik_dinilai: string;
  detail: string;
}

const TambahNilaiTable: React.FC = () => {
  const [formData, setFormData] = useState<NilaiInput>({
    no: 0,
    mata_pelajaran: "",
    rombel: "",
    wali_kelas: "",
    jmi_peserta_didik: "",
    jmi_peserta_didik_dinilai: "",
    detail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "no" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/nilaiBeranda",
        formData
      );
      alert("Data berhasil ditambahkan!");
      console.log(res.data);
    } catch (error: any) {
      console.error(
        "Gagal menambahkan data:",
        error.response?.data || error.message
      );
      alert("Gagal menambahkan data.");
    }
  };

  return (
    <div className="p-3">
      <h3 className="mb-4">Tambah Nilai Guru</h3>

      {/* TABEL UNTUK DESKTOP */}
      <div className="d-none d-md-block">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Mata Pelajaran</th>
              <th>Rombel</th>
              <th>Wali Kelas</th>
              <th>JMI Peserta Didik</th>
              <th>JMI Dinilai</th>
              <th>Detail</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Control
                  type="number"
                  name="no"
                  value={formData.no}
                  onChange={handleChange}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="mata_pelajaran"
                  value={formData.mata_pelajaran}
                  onChange={handleChange}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="rombel"
                  value={formData.rombel}
                  onChange={handleChange}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="wali_kelas"
                  value={formData.wali_kelas}
                  onChange={handleChange}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="jmi_peserta_didik"
                  value={formData.jmi_peserta_didik}
                  onChange={handleChange}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="jmi_peserta_didik_dinilai"
                  value={formData.jmi_peserta_didik_dinilai}
                  onChange={handleChange}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="detail"
                  value={formData.detail}
                  onChange={handleChange}
                />
              </td>
              <td>
                <Button variant="success" onClick={handleSubmit}>
                  Tambah
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* CARD UNTUK MOBILE */}
      <div className="d-block d-md-none">
        <Card className="mb-3 shadow-sm">
          <Card.Body>
            <Form.Group className="mb-2">
              <Form.Label>No</Form.Label>
              <Form.Control
                type="number"
                name="no"
                value={formData.no}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Mata Pelajaran</Form.Label>
              <Form.Control
                type="text"
                name="mata_pelajaran"
                value={formData.mata_pelajaran}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Rombel</Form.Label>
              <Form.Control
                type="text"
                name="rombel"
                value={formData.rombel}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Wali Kelas</Form.Label>
              <Form.Control
                type="text"
                name="wali_kelas"
                value={formData.wali_kelas}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>JMI Peserta Didik</Form.Label>
              <Form.Control
                type="text"
                name="jmi_peserta_didik"
                value={formData.jmi_peserta_didik}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>JMI Dinilai</Form.Label>
              <Form.Control
                type="text"
                name="jmi_peserta_didik_dinilai"
                value={formData.jmi_peserta_didik_dinilai}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Detail</Form.Label>
              <Form.Control
                type="text"
                name="detail"
                value={formData.detail}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="success" onClick={handleSubmit}>
                Tambah
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default TambahNilaiTable;

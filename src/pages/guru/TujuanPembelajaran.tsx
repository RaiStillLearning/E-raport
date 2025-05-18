import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";

interface Tujuan {
  _id: string;
  tingkat: string;
  tujuan_pembelajaran: string;
}

const TujuanPembelajaran: React.FC = () => {
  const [data, setData] = useState<Tujuan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState<Tujuan | null>(null);
  const [saving, setSaving] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [newTingkat, setNewTingkat] = useState("");
  const [newTujuan, setNewTujuan] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/Tujuanpembelajaran");
      setData(res.data.data || res.data);
    } catch {
      setError("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTingkat.trim() || !newTujuan.trim()) {
      alert("Tingkat dan Tujuan wajib diisi!");
      return;
    }
    setAdding(true);
    try {
      const res = await axios.post("http://localhost:5000/Tujuanpembelajaran", {
        tingkat: newTingkat,
        tujuan_pembelajaran: newTujuan, // <-- ubah disini sesuai backend
      });
      setData((prev) => [...prev, res.data.data || res.data]);
      setNewTingkat("");
      setNewTujuan("");
    } catch (err) {
      alert("Gagal menambahkan data");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;

    try {
      await axios.delete(`http://localhost:5000/Tujuanpembelajaran/${id}`);
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch {
      alert("Gagal hapus data");
    }
  };

  const handleEditOpen = (item: Tujuan) => {
    setEditData(item);
    setShowEdit(true);
  };

  const handleEditClose = () => {
    setShowEdit(false);
    setEditData(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;

    setSaving(true);
    try {
      await axios.patch(
        `http://localhost:5000/Tujuanpembelajaran/${editData._id}`,
        {
          tingkat: editData.tingkat,
          tujuan: editData.tujuan,
        }
      );
      setData((prev) =>
        prev.map((item) => (item._id === editData._id ? { ...editData } : item))
      );
      handleEditClose();
    } catch {
      alert("Gagal update data");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container fluid className="p-3">
      {/* Baris tombol tambah */}
      <Row className="mb-3 align-items-center">
        <Col xs={8} sm={10}>
          <h3 className="m-0">Tujuan Pembelajaran</h3>
        </Col>
        <Col xs={4} sm={2} className="text-end">
          <Button size="sm" onClick={() => setShowAdd(true)}>
            + Tambah
          </Button>
        </Col>
      </Row>

      {/* Tabel responsif */}
      <div style={{ overflowX: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ minWidth: 40 }}>NO</th>
              <th style={{ minWidth: 100 }}>TINGKAT</th>
              <th style={{ minWidth: 200 }}>TUJUAN PEMBELAJARAN</th>
              <th style={{ minWidth: 120 }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  Data kosong
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>{item.tingkat}</td>
                  <td>{item.tujuan_pembelajaran}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditOpen(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal Edit */}
      <Modal show={showEdit} onHide={handleEditClose} centered>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Tujuan Pembelajaran</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formEditTingkat">
              <Form.Label>Tingkat</Form.Label>
              <Form.Control
                type="text"
                value={editData?.tingkat || ""}
                onChange={(e) =>
                  setEditData((prev) =>
                    prev ? { ...prev, tingkat: e.target.value } : prev
                  )
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEditTujuan">
              <Form.Label>Tujuan Pembelajaran</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editData?.tujuan || ""}
                onChange={(e) =>
                  setEditData((prev) =>
                    prev ? { ...prev, tujuan: e.target.value } : prev
                  )
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleEditClose}
              disabled={saving}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal Tambah */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        <Form onSubmit={handleAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Tujuan Pembelajaran</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formNewTingkat">
              <Form.Label>Tingkat</Form.Label>
              <Form.Control
                type="text"
                value={newTingkat}
                onChange={(e) => setNewTingkat(e.target.value)}
                placeholder="Masukkan tingkat"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNewTujuan">
              <Form.Label>Tujuan Pembelajaran</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTujuan}
                onChange={(e) => setNewTujuan(e.target.value)}
                placeholder="Masukkan tujuan pembelajaran"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAdd(false)}
              disabled={adding}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={adding}>
              {adding ? "Menambahkan..." : "Tambah"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default TujuanPembelajaran;

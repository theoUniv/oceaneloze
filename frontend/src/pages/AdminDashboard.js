import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Image, LayoutList, Mail, Plus, Trash, Edit2, X } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('portfolio');
    const [cards, setCards] = useState([]);
    const [contacts, setContacts] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('portfolio');
    const [newType, setNewType] = useState('image'); // portfolio: 'image' ou 'quote'
    const [newImage, setNewImage] = useState('');
    const [newDescription, setNewDescription] = useState(''); // cols (1/2) pour image, text pour quote
    const [newPrice, setNewPrice] = useState('');
    const [newFeatures, setNewFeatures] = useState(''); // Liste séparée par des virgules ou retours à la ligne

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
            return;
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        fetchCards();
        fetchContacts();
    }, [navigate, activeTab]);

    const fetchCards = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/portfolio/cards`);
            setCards(res.data.sort((a,b) => a.order - b.order));
        } catch (err) {
            console.error('Erreur de chargement des cartes', err);
        }
    };

    const fetchContacts = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/contacts`);
            setContacts(res.data);
        } catch (err) {
            console.error('Erreur de chargement des contacts', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    const resetForm = () => {
        setEditingId(null);
        setNewTitle('');
        setNewDescription('');
        setNewImage('');
        setNewPrice('');
        setNewFeatures('');
        setNewType('image');
    };

    const handleEditClick = (card) => {
        setEditingId(card.id);
        setNewTitle(card.title || '');
        setNewType(card.type || 'image');
        setNewImage(card.imagePath || '');
        setNewDescription(card.description || '');
        setNewPrice(card.price || '');
        setNewFeatures(card.features ? JSON.parse(card.features).join('\n') : '');
        // Scroll vers le formulaire
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setNewImage(res.data.imagePath); // Ex: /images/upload_123.jpg
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'upload de l'image");
        }
    };

    const handleDeleteCard = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) return;
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/portfolio/cards/${id}`);
            fetchCards();
        } catch (err) {
            alert("Erreur lors de la suppression");
        }
    };

    const handleSubmitCard = async (e) => {
        e.preventDefault();

        // Formatter les features pour la bdd
        let formattedFeatures = null;
        if (activeTab === 'prestation' && newFeatures) {
            const list = newFeatures.split('\n').map(l => l.trim()).filter(l => l !== '');
            formattedFeatures = JSON.stringify(list);
        }

        const payload = {
            title: newTitle,
            description: newDescription,
            category: activeTab,
            type: newType,
            imagePath: newImage,
            price: newPrice,
            features: formattedFeatures,
            order: cards.length + 1
        };

        try {
            if (editingId) {
                await axios.put(`${process.env.REACT_APP_API_URL}/api/portfolio/cards/${editingId}`, payload);
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/portfolio/cards`, payload);
            }
            resetForm();
            fetchCards();
        } catch (err) {
            alert("Erreur lors de la sauvegarde");
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Lora, sans-serif' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', background: '#333', color: '#fff', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ padding: '20px', margin: 0, textAlign: 'center', borderBottom: '1px solid #444', color: '#cbaa8f' }}>Dashboard Admin</h2>
                <nav style={{ flex: 1, marginTop: '20px' }}>
                    <button style={btnStyle(activeTab === 'portfolio')} onClick={() => { setActiveTab('portfolio'); resetForm(); }}><Image size={18} style={{ marginRight: '10px' }} /> Portfolio</button>
                    <button style={btnStyle(activeTab === 'prestation')} onClick={() => { setActiveTab('prestation'); resetForm(); }}><LayoutList size={18} style={{ marginRight: '10px' }} /> Prestations</button>
                    <button style={btnStyle(activeTab === 'contacts')} onClick={() => { setActiveTab('contacts'); resetForm(); }}><Mail size={18} style={{ marginRight: '10px' }} /> Messages</button>
                </nav>
                <div style={{ padding: '20px' }}>
                    <button style={{ ...btnStyle(), display: 'flex', justifyContent: 'center', backgroundColor: '#e74c3c' }} onClick={handleLogout}><LogOut size={16} /> Déconnexion</button>
                    <a href="/" style={{ display: 'block', textAlign: 'center', marginTop: '10px', color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Retour au site</a>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto', background: '#f9f9f9' }}>

                {activeTab === 'contacts' && (
                    <div>
                        <h2 style={titleStyle}>Derniers Messages / Demandes</h2>
                        {contacts.map((c) => (
                            <div key={c.id} style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ margin: '0 0 10px 0' }}>{c.nom} ({c.prestation})</h3>
                                <p style={{ margin: 0 }}><strong>Email :</strong> {c.email} | <strong>Tél :</strong> {c.telephone}</p>
                                <p style={{ margin: '5px 0' }}><strong>Créneau :</strong> {c.creneau}</p>
                                <div style={{ marginTop: '10px', padding: '10px', background: '#f1f1f1', borderRadius: '5px' }}>{c.message || "Aucun message supplémentaire."}</div>
                                <small style={{ color: '#888', display: 'block', marginTop: '10px' }}>Reçu le {new Date(c.date).toLocaleString('fr-FR')}</small>
                            </div>
                        ))}
                    </div>
                )}

                {(activeTab === 'portfolio' || activeTab === 'prestation') && (
                    <div>
                        <h2 style={titleStyle}>Gérer {activeTab === 'portfolio' ? 'le Portfolio' : 'les Prestations'}</h2>

                        <form onSubmit={handleSubmitCard} style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', position: 'relative' }}>
                            {editingId && (
                                <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#f39c12', color: '#fff', padding: '5px 10px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold' }}>
                                    Mode Édition
                                </div>
                            )}
                            
                            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                {activeTab === 'portfolio' && (
                                    <select value={newType} onChange={e => setNewType(e.target.value)} style={inputStyle}>
                                        <option value="image">Image Média</option>
                                        <option value="quote">Citation (Quote)</option>
                                    </select>
                                )}

                                {(activeTab === 'prestation' || (activeTab === 'portfolio' && newType === 'image')) && (
                                    <>
                                        <input placeholder="Titre (ex: Mariage d'Automne)" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={inputStyle} />
                                        
                                        <div style={{ display: 'flex', gap: '10px', flex: '1 1 100%', alignItems: 'center', background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
                                            <label style={{ cursor: 'pointer', background: '#888', color: '#fff', padding: '10px 15px', borderRadius: '4px', fontSize: '14px' }}>
                                                Upload Fichier
                                                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                                            </label>
                                            <span style={{ fontSize: '14px', color: '#555' }}>OU</span>
                                            <input placeholder="Chemin/URL manuelle complète (/images/x.webp)" value={newImage} onChange={(e) => setNewImage(e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                                            {newImage && <img src={newImage.startsWith('http') ? newImage : `${process.env.REACT_APP_API_URL}/api/images/thumbnail?path=${encodeURIComponent(newImage)}`} alt="Aperçu" style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }} />}
                                        </div>
                                    </>
                                )}

                                {activeTab === 'portfolio' && newType === 'image' && (
                                    <input placeholder="Colonnes (ex: 1 ou 2)" value={newDescription} onChange={e => setNewDescription(e.target.value)} style={{ ...inputStyle, flex: 'none', width: '150px' }} />
                                )}

                                {activeTab === 'portfolio' && newType === 'quote' && (
                                    <input placeholder="Texte de la citation" value={newDescription} onChange={e => setNewDescription(e.target.value)} style={{ ...inputStyle, width: '100%' }} />
                                )}

                                {activeTab === 'prestation' && (
                                    <>
                                        <input placeholder="Tarif (ex: À partir de 120€)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} style={inputStyle} />
                                        <input placeholder="Texte du Bouton (ex: Réserver cette séance)" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} style={inputStyle} />
                                    </>
                                )}
                            </div>

                            {activeTab === 'prestation' && (
                                <textarea placeholder="Fonctionnalités/Contenu (une ligne par point)" value={newFeatures} onChange={(e) => setNewFeatures(e.target.value)} rows="4" style={{ ...inputStyle, width: '100%', resize: 'vertical' }} />
                            )}

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit" style={{ padding: '10px 20px', background: '#cbaa8f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', width: 'fit-content' }}>
                                    {editingId ? <><Edit2 size={18} style={{ marginRight: '5px' }} /> Sauvegarder</> : <><Plus size={18} style={{ marginRight: '5px' }} /> Ajouter</>}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={resetForm} style={{ padding: '10px 20px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', width: 'fit-content' }}>
                                        <X size={18} style={{ marginRight: '5px' }} /> Annuler
                                    </button>
                                )}
                            </div>
                        </form>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                            {cards.filter(c => c.category === activeTab).map((c) => (
                                <div key={c.id} style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                                    {c.type !== 'quote' && (
                                        <img src={c.imagePath && c.imagePath.startsWith('http') ? c.imagePath : (c.imagePath || '')} alt={c.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                    )}
                                    <div style={{ padding: '15px' }}>
                                        {c.type === 'quote' ? (
                                            <blockquote style={{ fontStyle: 'italic', fontSize: '1.1rem', margin: 0 }}>"{c.description}"</blockquote>
                                        ) : (
                                            <>
                                                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{c.title || "Sans Titre"}</h3>
                                                {c.price && <p style={{ color: '#cbaa8f', fontWeight: 'bold' }}>{c.price}</p>}
                                                {c.features && (
                                                    <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#555' }}>
                                                        {JSON.parse(c.features).map((f, i) => <li key={i}>{f}</li>)}
                                                    </ul>
                                                )}
                                                {activeTab === 'portfolio' && <p style={{ color: '#999', fontSize: '12px' }}>Cols: {c.description || 1}</p>}
                                            </>
                                        )}
                                    </div>
                                    <div style={{ padding: '10px 15px', background: '#fdfbfa', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                        <button onClick={() => handleEditClick(c)} style={{ color: '#3498db', background: 'transparent', border: 'none', cursor: 'pointer' }}><Edit2 size={16} /></button>
                                        <button onClick={() => handleDeleteCard(c.id)} style={{ color: '#e74c3c', background: 'transparent', border: 'none', cursor: 'pointer' }}><Trash size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Styles helpers
const btnStyle = (active = false) => ({
    width: '100%',
    padding: '15px 20px',
    border: 'none',
    background: active ? '#444' : 'transparent',
    color: active ? '#cbaa8f' : '#fff',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.2s'
});

const titleStyle = { 
    fontFamily: 'Adelia', 
    color: '#333', 
    marginBottom: '20px', 
    borderBottom: '2px solid #cbaa8f', 
    display: 'inline-block', 
    paddingBottom: '5px' 
};

const inputStyle = {
    flex: '1 1 200px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px'
};

export default AdminDashboard;

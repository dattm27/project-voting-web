import { useState } from 'react';
import styles from './EditCandidateForm.module.scss';

const EditCandidateForm = ({candidateName, onSuccess }) => {
    const [description, setDescription] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const [imagePreview, setImagePreview] = useState(null); // Store preview URL

    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                setBase64Image(base64String);
                setImagePreview(reader.result); // Set preview URL
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Edit Candidate</h2>

            <label>Name</label>
            <input
                type="text"
                placeholder="Candidate Name"
                value={candidateName}
                className={styles.inputField}
                disabled={true}
            />

            <label>Description</label>
            <textarea
                placeholder="Candidate Description"
                value={description}
                onChange={handleDescriptionChange}
                className={styles.inputField}
            />

            <label>Avatar</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.imageUpload}
            />

            {imagePreview && (
                <div className={styles.imagePreviewContainer}>
                    <label>Avatar Preview</label>
                    <img
                        src={imagePreview}
                        alt="Selected Candidate Avatar"
                        className={styles.imagePreview}
                    />
                </div>
            )}

            <button className={styles.saveBtn}>
                    Save change
            </button>
        </div>
    );
};

export default EditCandidateForm;

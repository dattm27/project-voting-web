import { useState } from 'react';
import styles from './EditCandidateForm.module.scss';
import { updateElection } from '../../Services/serverServices.js';
import { uploadImageByFile } from '../../Services/CloudinaryServices.js';

const EditElectionForm = ({ onSuccess, election }) => {
    const [description, setDescription] = useState(election?.description||""); // Initialize description
    const [photo, setPhoto] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // Store preview URL
    // console.log(election)
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setPhoto(file); // Save file to state
            setImagePreview(URL.createObjectURL(file)); // Generate preview
        } else {
            alert("Please upload a valid image file (JPEG or PNG).");
        }
    };

    const handleSubmitUpdate = async () => {
        try {
            let photoLink = election?.photoLink; // Default to existing photo link
            if (photo) {
                const uploadedPhoto = await uploadImageByFile(photo);
                photoLink = uploadedPhoto.photoLink;
            }

            const electionData = {
                description: `${description}`,
                photoLink: photoLink,
            };

            await updateElection(election?.id,electionData);
            onSuccess(); // Trigger success callback to refetch data
        } catch (error) {
            console.error('Error updating candidate:', error);
            alert('Failed to update candidate. Please try again.');
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Edit Election</h2>

            <label>Name</label>
            <input
                type="text"
                placeholder="Candidate Name"
                value={election?.name||""}
                className={styles.inputField}
                disabled
            />

            <label>Description</label>
            <textarea
                placeholder="Enter Candidate Description"
                value={description}
                onChange={handleDescriptionChange}
                className={styles.textAreaField} // Added distinct class for textarea
            />

            <label>Election Poster</label>
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

            <button className={styles.saveBtn} onClick={handleSubmitUpdate}>
                Save Changes
            </button>
        </div>
    );
};

export default EditElectionForm;

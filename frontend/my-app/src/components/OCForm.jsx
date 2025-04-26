import React, { useState } from 'react';
import { createOC } from '../api/ocAPI';

const OCForm = () => {
  const [fullname, setFullname] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [backstory, setBackstory] = useState('');
  const [personality, setPersonality] = useState('');
  const [likes, setLikes] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ocData = {
      fullname,
      nickname,
      age,
      backstory,
      personality,
      likes,
      dislikes,
      imageUrl
    };

    const newOC = await createOC(ocData);
    if (newOC) {
      // Reset form or handle success
      console.log('OC Created:', newOC);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New OC</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <textarea
        placeholder="Backstory"
        value={backstory}
        onChange={(e) => setBackstory(e.target.value)}
      />
      <textarea
        placeholder="Personality"
        value={personality}
        onChange={(e) => setPersonality(e.target.value)}
      />
      <input
        type="text"
        placeholder="Likes"
        value={likes}
        onChange={(e) => setLikes(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dislikes"
        value={dislikes}
        onChange={(e) => setDislikes(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">Create OC</button>
    </form>
  );
};

export default OCForm;
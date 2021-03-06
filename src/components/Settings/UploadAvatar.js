import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import NoAvatar from "../../assets/png/user.png";
import firebase from "../../utils/Firebase";
import "firebase/storage";
import "firebase/auth";

export default function UploadAvatar(props) {
  const { user, setReloadApp } = props;

  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  const onDrop = useCallback((accepted) => {
    const file = accepted[0];
    setAvatarUrl(URL.createObjectURL(file));
    uploadImg(file).then(() => {
      updateUserAvatar();
    });
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const uploadImg = (file) => {
    const ref = firebase.storage().ref().child(`avatar/${user.uid}`);
    return ref.put(file);
  };

  const updateUserAvatar = () => {
    firebase
      .storage()
      .ref(`avatar/${user.uid}`)
      .getDownloadURL()
      .then(async (res) => {
        await firebase.auth().currentUser.updateProfile({ photoURL: res });
        setReloadApp((prev) => !prev);
      })
      .catch(() => {
        toast.error("Error al actualizar avatar.");
      });
  };

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : (
        <Image src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

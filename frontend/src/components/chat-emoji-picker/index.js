import React, { useState } from 'react';
import styles from './index.module.css';

function EmojiPicker({ onClick, display }) {
    const [emojis, setEmojis] = useState(['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😗', '🥰', '😘', '😍', '😎', '😋', '😊', '😉', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😮', '😥', '😣', '😏', '🙄', '😶', '😑', '😐', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '🙃', '😕', '😔', '😓', '😒', '🤤', '😝', '😜', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😬', '🤯', '😩', '😨', '😧', '😦', '😭', '😢', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '🥴', '🤮', '🤢', '🤕', '🤒', '😷', '🤬', '😠', '🤧', '🥳', '😇', '😈', '🤓', '🧐', '🤭']);
    return (
        <div className={styles.container} style={{display: display ? 'block' : 'none' }}>
            {emojis.map((emoji, index) => {
                return (
                    <button onClick={onClick} value={emoji} key={index}>{emoji}</button>
                )
            })}
        </div>
    )
}

export default EmojiPicker;
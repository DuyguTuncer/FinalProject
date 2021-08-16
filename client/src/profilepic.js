
export default function ProfilePic({ first, last, imageUrl, className }) {
    let imgUrl = imageUrl || "/images/default-profilepic.jpg";
    let alternative = `${first} ${last}` || "/images/default-profilepic.jpg";
    return (
        <div className="profilePicBig">
            <img className={className} src={imgUrl} alt={alternative} />
        </div>
    );
}




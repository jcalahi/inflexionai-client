import { Text } from "components/text";
import AvatarIcon from "assets/icons/avatar.svg";
import TwitterIcon from "assets/icons/twitter.svg";
import StarIcon from "assets/icons/star.svg";
import colors from "styles/colors.module.scss";
import classes from "./testimonial.module.scss";

const Testimonial = ({ children, user }) => {
  const showRating = (rating) => (
    <div className={classes.rating}>
      {Array.from({ length: rating }, (_, index) => (
        <img key={index} src={StarIcon} alt="star icon" />
      ))}
    </div>
  );

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.user}>
          <img src={AvatarIcon} alt="avatar icon" />
          <div className={classes.details}>
            <Text className={classes.name} color={colors.grey50}>
              {`${user.first_name} ${user.last_name}`}
            </Text>
            <Text className={classes.title} color={colors.grey25}>
              {user.job_title}
            </Text>
          </div>
        </div>
        <img
          className={classes.productIcon}
          src={TwitterIcon}
          alt="product icon"
        />
      </div>
      {showRating(user.rating)}
      <div>
        <Text className={classes.content}>{children}</Text>
      </div>
    </div>
  );
};

export { Testimonial };

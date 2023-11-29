//@ts-nocheck
type Review = {
    course: string,
    rating: number,
    review: string,
    _id: string,
    createdAt: string,
    updatedAt: string
}

const helper = () => {
  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text; 
    } else {
      const truncatedText = text.substring(0, maxLength).trim();
      return `${truncatedText}...`;
    }
  }

  function calculateRatingCounts(review: Review[]){
    let ratingCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      total:review.length
    };
    review.forEach((item:Review) => {
      ratingCounts[item.rating] += 1;
    });
    return ratingCounts;
  }
  function formatDateTime(timestamp) {
    const dateObject = new Date(timestamp);
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    };
  
    return dateObject.toLocaleString(options);
  }

  function getTimeAgo(timestamp: string): string {
    const currentDate = new Date();
    const inputDate = new Date(timestamp);
  
    const timeDifferenceInMilliseconds = currentDate.getTime() - inputDate.getTime();
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
    const timeDifferenceInMonths = Math.floor(timeDifferenceInDays / 30);
    const timeDifferenceInYears = Math.floor(timeDifferenceInDays / 365);
  
    if (timeDifferenceInYears > 0) {
      return `${timeDifferenceInYears} ${timeDifferenceInYears === 1 ? 'year' : 'years'} ago`;
    } else if (timeDifferenceInMonths > 0) {
      return `${timeDifferenceInMonths} ${timeDifferenceInMonths === 1 ? 'month' : 'months'} ago`;
    } else if (timeDifferenceInDays > 0) {
      return `${timeDifferenceInDays} ${timeDifferenceInDays === 1 ? 'day' : 'days'} ago`;
    } else if (timeDifferenceInHours > 0) {
      return `${timeDifferenceInHours} ${timeDifferenceInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (timeDifferenceInMinutes > 0) {
      return `${timeDifferenceInMinutes} ${timeDifferenceInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (timeDifferenceInSeconds > 0) {
      return `Just now`;
    }
    else {
      return 'Not yet';
    }
  }

  return {calculateRatingCounts,truncateText,formatDateTime,getTimeAgo};
};

export default helper;



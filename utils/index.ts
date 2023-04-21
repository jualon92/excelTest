
 

export const sort_by_id = () => {
    return function (elem1: { id: number; }, elem2: { id: number; }) {
      if (elem1.id < elem2.id) {
        return -1;
      } else if (elem1.id > elem2.id) {
        return 1;
      } else {
        return 0;
      }
    };
  }
 
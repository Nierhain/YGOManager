

const sortAlphabetically = (a: any, b: any) => {
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (y < x) {
            return 1;
          }
          return 0;
}

export {sortAlphabetically}
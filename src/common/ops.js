export const clampValue = (val, min, max) => Math.min(Math.max(val, min), max);
export const lowercaseTrim = (str) => str.toLowerCase().trim();
export const chunkArray = (arr, size) => {
   const res = [];
   for (let i = 0; i < arr.length; i += size) {
       res.push(arr.slice(i, i + size));
   }
   return res;
};
export const parseArray = (str) => str ? str.split(',') : [];
export const parseBoolean = (str) => str === 'true';

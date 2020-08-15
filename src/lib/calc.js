export const genRandPos = (p1X, p1Y, p2X, p2Y) => {
  if (p2X > p1X) {
    const temp = p1X;
    p1X = p2X;
    p2X = temp;
  }

  if (p2Y > p1Y) {
    const temp = p1Y;
    p1Y = p2Y;
    p2Y = temp;
  }

  const mX = Math.floor((p1X + p2X) / 10);
  const mY = Math.floor((p1Y + p2Y) / 10);

  const roundX = Math.pow(10, mX);
  const roundY = Math.pow(10, mY);

  const pX = Math.floor(Math.random() * roundX) % (p1X - p2X);
  const pY = Math.floor(Math.random() * roundY) % (p1Y - p2Y);

  return {
    left: p2X + pX,
    top: p2Y + pY,
  };
};

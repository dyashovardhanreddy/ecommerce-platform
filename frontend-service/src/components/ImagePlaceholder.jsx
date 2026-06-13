function ImagePlaceholder({ label = 'Product image' }) {
  return (
    <div className="imagePlaceholder" role="img" aria-label={label}>
      <span>No image</span>
    </div>
  );
}

export default ImagePlaceholder;

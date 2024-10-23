namespace Nobeless.api.Util
{
    public class UploadHandler
    {

        private readonly string _uploadPath;

        public UploadHandler()
        {
            _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            // Ensure the upload directory exists
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath);
            }
        }

        public string Upload(IFormFile file)
        {
            // Validate extension
            List<string> validExtensions = new List<string> { ".jpg", ".jpeg", ".png", ".gif" };
            string extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!validExtensions.Contains(extension))
            {
                throw new InvalidOperationException($"Invalid file extension. Allowed extensions are: {string.Join(", ", validExtensions)}");
            }

          
            const long maxSize = 10 * 1024 * 1024; 
            if (file.Length > maxSize)
            {
                throw new InvalidOperationException("File size exceeds the 10MB limit.");
            }

            // Generate a unique file name
            string fileName = $"{Guid.NewGuid()}{extension}";
            string filePath = Path.Combine(_uploadPath, fileName);

            // Save the file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return fileName;
        }
    }
}

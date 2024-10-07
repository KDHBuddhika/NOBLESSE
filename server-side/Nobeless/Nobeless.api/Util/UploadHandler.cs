namespace Nobeless.api.Util
{
    public class UploadHandler
    {

        public string Upload(IFormFile file)
        {
            //extention
            List<string> validExtention = new List<string>() { ".jpg",".jpge",".png",".gif"};

            string extention = Path.GetExtension(file.FileName);
            if (!validExtention.Contains(extention))
            {
                return $"extention is not validExtention({string.Join(',',validExtention)})";
            }

            //file size 
            long size = file.Length;
            if (size > (10*1024*1024)) {
                return "maximum size can be 10MB";
            }

            //name changing
            string fileName = Guid.NewGuid().ToString() + extention;
            string path = Path.Combine(Directory.GetCurrentDirectory(),"Uploads");

            using FileStream stream = new FileStream(path + fileName, FileMode.Create);
            file.CopyTo(stream);


            return fileName ;
        }
    }
}

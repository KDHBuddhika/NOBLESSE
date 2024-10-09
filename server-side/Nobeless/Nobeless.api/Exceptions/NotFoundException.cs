namespace Nobeless.api.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException() : base() { }

        public NotFoundException(string message) : base(message) { }

        public NotFoundException(string message, IOException innerException) : base(message, innerException) { }

    }
}

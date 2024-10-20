
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Model.Dtos.ResponseDtos;

namespace Nobeless.api.Service
{
    public interface UserService
    {
        Task<bool> CovertToSeller(Guid id);
        Task<GetUserDtos> GetUserById(Guid id);
        Task<User> UpdateContactDetails(Guid id, UpdateContactDetailsDto contactDetailsDto);
    }
}

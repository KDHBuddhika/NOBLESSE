using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Exceptions;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Model.Dtos.ResponseDtos;

namespace Nobeless.api.Service.IMPL
{
    public class UserServiceIMPL : UserService
    {

        private readonly NobelessDbContext _dbContext;

        // Inject the NobelessDbContext in the constructor
        public UserServiceIMPL(NobelessDbContext dbContext)
        {
            _dbContext = dbContext;
        }

    

        //-------------------------------------Get user By Id ----------------------------------------
        public async Task<GetUserDtos> GetUserById(Guid id)
        {
            var user = await _dbContext.users.FindAsync(id);  

            if (user == null)
            {
                throw new NotFoundException("User not found.");
            }

           
            var userDto = new GetUserDtos
            {
                Id = user.Id.ToString(),
                UserName = user.UserName,
                Email = user.Email,
                Register_date = user.Register_date,
                isVerified = user.isVerified,
                usertype = user.usertype.ToString(),
                PhoneNumber = user.PhoneNumber,
                Address = user.Address,
                City = user.City,
                Lane = user.Lane
            };

            return userDto;
        }



        //------------------------------- Update Conntact details-------------------------------------
        public async Task<User> UpdateContactDetails(Guid id, UpdateContactDetailsDto contactDetailsDto)
        {
            var user = await _dbContext.users.FindAsync(id);

            if (user == null)
            {
                return null;
            }

            // Update contact details
            user.PhoneNumber = contactDetailsDto.PhoneNumber;
            user.Address = contactDetailsDto.Address;
           
            user.Lane = contactDetailsDto.Lane;
            user.City = contactDetailsDto.City;

            await _dbContext.SaveChangesAsync();

            return user;
        }



        //---------------------- convert to seller-------------------------------
        public async Task<bool> CovertToSeller(Guid id)
        {
            var user = await _dbContext.users.FindAsync(id);

            if (user == null)
            {
                throw new NotFoundException("User Can not found");
            }
            user.usertype = Util.Usertype.seller;

            await _dbContext.SaveChangesAsync();

            return true;
        }

    }
    
}

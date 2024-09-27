using IssuesApp.Server.Models;
using IssuesApp.Server.Models.Dto;
using IssuesApp.Server.Repository;

namespace IssuesApp.Server.Service
{
	public class IssueService : IIssueService
	{
		private readonly IIssueRepository _issueRepository;

		public IssueService(IIssueRepository issueRepository)
		{
			_issueRepository = issueRepository;
		}

		#region IIssueService Members
		public async Task<IEnumerable<Issue>> GetAllIssuesAsync()
		{
			return await _issueRepository.GetAllIssuesAsync();
		}

		public async Task<Issue> GetIssueByIdAsync(int id)
		{
			return await _issueRepository.GetIssueByIdAsync(id);
		}

		public async Task<Issue> CreateIssueAsync(CreateIssueDto issueDto)
		{
			var newIssue = new Issue
			{
				Title = issueDto.Title,
				Description = issueDto.Description
			};

			return await _issueRepository.AddIssueAsync(newIssue);
		}

		public async Task<Issue> UpdateIssueAsync(UpdateIssueDto issueDto, int id)
		{
			var issueToUpdate = await _issueRepository.GetIssueByIdAsync(id);
			if (issueToUpdate == null)
			{
				return null;
			}

			issueToUpdate.Title = issueDto.Title;
			issueToUpdate.Description = issueDto.Description;

			return await _issueRepository.UpdateIssueAsync(issueToUpdate);
		}

		public async Task<bool> DeleteIssueAsync(int id)
		{
			return await _issueRepository.DeleteIssueAsync(id);
		}
		#endregion

	}
}

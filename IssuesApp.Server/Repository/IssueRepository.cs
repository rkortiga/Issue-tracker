using IssuesApp.Server.Context;
using IssuesApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace IssuesApp.Server.Repository
{
	public class IssueRepository : IIssueRepository
	{
		private readonly MyDbContext _context;

		public IssueRepository(MyDbContext context)
		{
			_context = context;
		}

		#region IIssueRepository Members
		public async Task<IEnumerable<Issue>> GetAllIssuesAsync()
		{
			return await _context.Issues.ToListAsync();
		}

		public async Task<Issue> GetIssueByIdAsync(int id)
		{
			return await _context.Issues.FindAsync(id);
		}

		public async Task<Issue> AddIssueAsync(Issue issue)
		{
			_context.Issues.Add(issue);
			await _context.SaveChangesAsync();
			return issue;
		}

		public async Task<Issue> UpdateIssueAsync(Issue issue)
		{
			_context.Issues.Update(issue);
			await _context.SaveChangesAsync();
			return issue;
		}

		public async Task<bool> DeleteIssueAsync(int id)
		{
			var issue = await _context.Issues.FindAsync(id);
			if (issue == null) return false;

			_context.Issues.Remove(issue);
			await _context.SaveChangesAsync();
			return true;
		}
		#endregion

	}
}

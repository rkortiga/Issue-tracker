using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IssuesApp.Server.Models;

[Table("Issue")]
public partial class Issue
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Title { get; set; } = null!;

    [Column(TypeName = "text")]
    public string Description { get; set; } = null!;
}

const profile = {
  name: "Mahamud Raj",
  phone: "+8801903025406",
  email: "mahamudraj420@gmail.com",
  title: "Inspector - Recruitment Team",
  organization: "G4S Bangladesh",
  address: "Dhaka Training School, House # 10, Road # 12, Block # J, Baridhara, Dhaka-1212, Bangladesh"
};

document.getElementById("saveContact").addEventListener("click", () => {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.name}`,
    `ORG:${profile.organization}`,
    `TITLE:${profile.title}`,
    `TEL;TYPE=CELL:${profile.phone}`,
    `EMAIL:${profile.email}`,
    `ADR;TYPE=WORK:;;${profile.address}`,
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Mahamud-Raj.vcf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

document.getElementById("shareProfile").addEventListener("click", async () => {
  const shareData = {
    title: "Mahamud Raj | Digital Visiting Card",
    text: "Mahamud Raj — Inspector, Recruitment Team, G4S Bangladesh",
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
      alert("Profile link copied.");
    } else {
      prompt("Copy your profile link:", shareData.url);
    }
  } catch (error) {
    if (error.name !== "AbortError") alert("Could not share the profile. Please copy the page URL.");
  }
});

import { Component, HostListener } from '@angular/core';
import { CardData, BannerSlide, FaqItem } from '@shared-ui-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent {
  title = 'Welcome to New Website';
  bannerHeight = '600px';

  bannerSlides: BannerSlide[] = [
    {
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=800&fit=crop',
      title: 'Join Our Community Events',
      subtitle: 'Experience cultural celebrations and community gatherings • समुदाय कार्यक्रमों में शामिल हों',
      buttonText: 'Explore Events',
      buttonLink: '/events',
      overlayDark: true
    },
    {
      image: 'https://images.unsplash.com/photo-1582662216428-6de221780c15?w=1920&h=800&fit=crop',
      title: 'Discover Sacred Temples',
      subtitle: 'Visit beautiful temples with rich history and traditions • पवित्र मंदिरों की खोज करें',
      buttonText: 'View Temples',
      buttonLink: '/temples',
      overlayDark: true
    },
    {
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1920&h=800&fit=crop',
      title: 'Connect with Local Mandals',
      subtitle: 'Engage with vibrant community organizations • स्थानीय मंडलों से जुड़ें',
      buttonText: 'Find Mandals',
      buttonLink: '/mandals',
      overlayDark: true
    },
    {
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&h=800&fit=crop',
      title: 'Cultural Heritage & Traditions',
      subtitle: 'Preserving our rich cultural legacy for future generations',
      buttonText: 'Learn More',
      buttonLink: '/about',
      overlayDark: false
    }
  ];

  constructor() {
    this.updateBannerHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateBannerHeight();
  }

  private updateBannerHeight() {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) {
        this.bannerHeight = '400px';
      } else if (width < 1024) {
        this.bannerHeight = '500px';
      } else {
        this.bannerHeight = '600px';
      }
    }
  }

  demoCards: CardData[] = [
    {
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
      title: 'Preserving traditions in modern times',
      description: 'Exploring how our community maintains cultural heritage in a changing world',
      category: 'Culture',
      readTime: '5 min read'
    },
    {
      image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800&h=600&fit=crop',
      title: 'Youth engagement and leadership',
      description: 'Insights into developing strong community leaders and participation',
      category: 'Community',
      readTime: '5 min read'
    },
    {
      image: 'https://images.unsplash.com/photo-1582662216428-6de221780c15?w=800&h=600&fit=crop',
      title: 'Upcoming community celebrations',
      description: 'Highlights of significant cultural and spiritual gatherings',
      category: 'Events',
      readTime: '5 min read'
    },
    {
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop',
      title: 'Sacred temples and their significance',
      description: 'Understanding the spiritual and cultural importance of our temples',
      category: 'Temples',
      readTime: '7 min read'
    },
    {
      image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&h=600&fit=crop',
      title: 'Building stronger mandals together',
      description: 'Collaborative efforts in creating vibrant community organizations',
      category: 'Mandals',
      readTime: '6 min read'
    },
    {
      image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1a1f8a4?w=800&h=600&fit=crop',
      title: 'Traditional arts and crafts revival',
      description: 'Keeping ancient artistic traditions alive for future generations',
      category: 'Culture',
      readTime: '8 min read'
    }
  ];

  onShare(card: CardData): void {
    console.log('Share clicked:', card);
    // TODO: Implement share functionality
    alert(`Share: ${card.title}`);
  }

  onViewDetails(card: CardData): void {
    console.log('View details clicked:', card);
    // TODO: Navigate to details page
    alert(`View Details: ${card.title}`);
  }

  faqItems: FaqItem[] = [
    {
      question: 'How can I register for upcoming events?',
      questionHindi: 'मैं आगामी कार्यक्रमों के लिए कैसे पंजीकरण कर सकता हूं?',
      answer: 'You can register for events by visiting our Events page and clicking on the event you\'re interested in. Each event has a registration button that will guide you through the process. You may need to create an account or sign in to complete your registration.',
      answerHindi: 'आप हमारे कार्यक्रम पृष्ठ पर जाकर और जिस कार्यक्रम में आप रुचि रखते हैं उस पर क्लिक करके कार्यक्रमों के लिए पंजीकरण कर सकते हैं। प्रत्येक कार्यक्रम में एक पंजीकरण बटन है जो आपको प्रक्रिया के माध्यम से मार्गदर्शन करेगा।',
      category: 'Events'
    },
    {
      question: 'What are mandals and how do they work?',
      questionHindi: 'मंडल क्या हैं और वे कैसे काम करते हैं?',
      answer: 'Mandals are local community organizations that bring people together for social, cultural, and religious activities. They organize events, provide community services, and help preserve cultural traditions. You can join a mandal in your area by contacting them directly through our directory.',
      answerHindi: 'मंडल स्थानीय सामुदायिक संगठन हैं जो लोगों को सामाजिक, सांस्कृतिक और धार्मिक गतिविधियों के लिए एक साथ लाते हैं। वे कार्यक्रमों का आयोजन करते हैं, सामुदायिक सेवाएं प्रदान करते हैं, और सांस्कृतिक परंपराओं को संरक्षित करने में मदद करते हैं।',
      category: 'Mandals'
    },
    {
      question: 'What are the temple visiting hours?',
      questionHindi: 'मंदिर के दर्शन का समय क्या है?',
      answer: 'Temple visiting hours vary by location. Most temples are open from early morning (around 6 AM) until evening (around 8 PM). Special pujas and ceremonies may have different timings. Please check the specific temple page for accurate timings and any special occasion schedules.',
      answerHindi: 'मंदिर के दर्शन का समय स्थान के अनुसार भिन्न होता है। अधिकांश मंदिर सुबह जल्दी (लगभग 6 बजे) से शाम (लगभग 8 बजे) तक खुले रहते हैं। विशेष पूजा और समारोहों का समय अलग हो सकता है।',
      category: 'Temples'
    },
    {
      question: 'How can I contribute to the community?',
      questionHindi: 'मैं समुदाय में कैसे योगदान कर सकता हूं?',
      answer: 'There are many ways to contribute! You can volunteer at events, donate to causes, join a local mandal, participate in cultural activities, or help organize community programs. Visit our Community page to learn more about current opportunities and ongoing initiatives.',
      answerHindi: 'योगदान देने के कई तरीके हैं! आप कार्यक्रमों में स्वयंसेवा कर सकते हैं, कारणों के लिए दान कर सकते हैं, स्थानीय मंडल में शामिल हो सकते हैं, सांस्कृतिक गतिविधियों में भाग ले सकते हैं।',
      category: 'Community'
    },
    {
      question: 'Is membership required to attend events?',
      questionHindi: 'क्या कार्यक्रमों में भाग लेने के लिए सदस्यता आवश्यक है?',
      answer: 'Most community events are open to everyone, regardless of membership status. However, some special events or programs may be exclusive to members. Event details will clearly indicate if membership or registration is required.',
      answerHindi: 'अधिकांश सामुदायिक कार्यक्रम सभी के लिए खुले हैं, सदस्यता की स्थिति की परवाह किए बिना। हालांकि, कुछ विशेष कार्यक्रम या कार्यक्रम सदस्यों के लिए विशेष हो सकते हैं।',
      category: 'Events'
    },
    {
      question: 'How do I find temples near me?',
      questionHindi: 'मैं अपने पास के मंदिरों को कैसे ढूंढूं?',
      answer: 'Use our Temple Directory page where you can search by location, deity, or temple name. We also provide a map view to help you find temples in your area. Each temple listing includes address, timings, contact information, and directions.',
      answerHindi: 'हमारे मंदिर निर्देशिका पृष्ठ का उपयोग करें जहां आप स्थान, देवता या मंदिर के नाम से खोज सकते हैं। हम आपके क्षेत्र में मंदिरों को खोजने में मदद करने के लिए एक मानचित्र दृश्य भी प्रदान करते हैं।',
      category: 'Temples'
    }
  ];
}


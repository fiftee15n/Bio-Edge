import { CourseModel } from '../models/courseModel.js';
import { TeacherModel } from '../models/enrollmentModel.js';

export const CourseController = {
  /**
   * Public: List all available programs
   */
  async getAllCourses(req, res) {
    try {
      const courses = CourseModel.getAll();
      return res.status(200).json({
        success: true,
        count: courses.length,
        courses: courses.map(c => ({
          id: c.id,
          slug: c.slug,
          title: c.title,
          subtitle: c.subtitle,
          description: c.description,
          duration: c.duration,
          totalClasses: c.total_classes,
          seatLimit: c.seat_limit,
          enrolledCount: c.enrolled_count,
          availableSeats: Math.max(0, c.seat_limit - c.enrolled_count),
          fullFee: c.full_fee,
          monthlyFee: c.monthly_fee,
          discountAmount: c.discount_amount,
          metadata: c.metadata
        }))
      });
    } catch (error) {
      console.error('Fetch courses error:', error);
      return res.status(500).json({
        success: false,
        message: 'Unable to retrieve courses at this time.'
      });
    }
  },

  /**
   * Public: Get full course information, curriculum, pricing & seat status
   */
  async getCourseBySlug(req, res) {
    try {
      const { slugOrId } = req.params;
      const course = CourseModel.findBySlugOrId(slugOrId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Requested course could not be found.'
        });
      }

      const availableSeats = Math.max(0, course.seat_limit - course.enrolled_count);

      return res.status(200).json({
        success: true,
        course: {
          id: course.id,
          slug: course.slug,
          title: course.title,
          subtitle: course.subtitle,
          description: course.description,
          duration: course.duration,
          totalClasses: course.total_classes,
          seatLimit: course.seat_limit,
          enrolledCount: course.enrolled_count,
          availableSeats,
          fullFee: course.full_fee,
          monthlyFee: course.monthly_fee,
          discountAmount: course.discount_amount,
          curriculum: course.curriculum,
          metadata: course.metadata
        }
      });
    } catch (error) {
      console.error('Fetch course detail error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching course information.'
      });
    }
  },

  /**
   * Public: Teacher Profile
   */
  async getTeacherProfile(req, res) {
    try {
      const teacher = TeacherModel.getProfile();
      return res.status(200).json({
        success: true,
        teacher: teacher || {
          name: 'Afroza Tahmina',
          designation: 'Senior Faculty & Biology Specialist',
          institution: 'Former Faculty at Prestigious Institutions',
          experience: '8+ Years Teaching Excellence',
          specialization: 'HEC Biology 1st & 2nd Paper, Medical Admission Foundation',
          bio: 'Dedicated to helping students master Biology concepts with clarity, precision, and structured practice.',
          phone: '+880 1712-345678',
          email: 'afroza.tahmina@bioedge.edu'
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching teacher profile.'
      });
    }
  }
};
